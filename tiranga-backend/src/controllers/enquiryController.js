const Enquiry = require('../models/Enquiry');
const { sendEnquiryNotification, sendCustomerAcknowledgment } = require('../services/emailService');
const XLSX = require('xlsx');

// @desc    Create new enquiry
// @route   POST /api/enquiries
// @access  Public
exports.createEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.create(req.body);

    // Send email notifications
    try {
      await sendEnquiryNotification(enquiry);
      await sendCustomerAcknowledgment(enquiry);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: enquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private
exports.getEnquiries = async (req, res, next) => {
  try {
    const {
      status,
      priority,
      serviceType,
      source,
      startDate,
      endDate,
      search,
      page = 1,
      limit = 10,
      sort = '-createdAt'
    } = req.query;

    // Build query
    let query = {};

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (serviceType) query.serviceType = serviceType;
    if (source) query.source = source;

    // Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const enquiries = await Enquiry.find(query)
      .populate('assignedTo', 'name email')
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Enquiry.countDocuments(query);

    res.status(200).json({
      success: true,
      count: enquiries.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: enquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single enquiry
// @route   GET /api/enquiries/:id
// @access  Private
exports.getEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('notes.addedBy', 'name');

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update enquiry
// @route   PUT /api/enquiries/:id
// @access  Private
exports.updateEnquiry = async (req, res, next) => {
  try {
    let enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private
exports.deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    await enquiry.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add note to enquiry
// @route   POST /api/enquiries/:id/notes
// @access  Private
exports.addNote = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    enquiry.notes.push({
      text: req.body.text,
      addedBy: req.admin.id
    });

    await enquiry.save();

    res.status(200).json({
      success: true,
      message: 'Note added successfully',
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Export enquiries to Excel
// @route   GET /api/enquiries/export/excel
// @access  Private
exports.exportToExcel = async (req, res, next) => {
  try {
    const { status, startDate, endDate } = req.query;

    let query = {};
    if (status) query.status = status;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const enquiries = await Enquiry.find(query)
      .populate('assignedTo', 'name')
      .sort('-createdAt');

    // Transform data for Excel
    const excelData = enquiries.map(enq => ({
      'Date': new Date(enq.createdAt).toLocaleDateString(),
      'Name': enq.name,
      'Email': enq.email,
      'Phone': enq.phone,
      'City': enq.city || 'N/A',
      'State': enq.state || 'N/A',
      'Service Type': enq.serviceType,
      'Status': enq.status,
      'Priority': enq.priority,
      'Source': enq.source,
      'Assigned To': enq.assignedTo ? enq.assignedTo.name : 'Unassigned',
      'Message': enq.message
    }));

    // Create workbook
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Enquiries');

    // Generate buffer
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    // Set headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=enquiries-${Date.now()}.xlsx`);

    res.send(buffer);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get enquiry statistics
// @route   GET /api/enquiries/stats/dashboard
// @access  Private
exports.getStats = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
    }

    // Total counts
    const totalEnquiries = await Enquiry.countDocuments(dateFilter);
    const newEnquiries = await Enquiry.countDocuments({ ...dateFilter, status: 'new' });
    const qualifiedLeads = await Enquiry.countDocuments({ ...dateFilter, status: 'qualified' });
    const convertedLeads = await Enquiry.countDocuments({ ...dateFilter, status: 'converted' });

    // Status breakdown
    const statusBreakdown = await Enquiry.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Service type breakdown
    const serviceTypeBreakdown = await Enquiry.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$serviceType', count: { $sum: 1 } } }
    ]);

    // Source breakdown
    const sourceBreakdown = await Enquiry.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$source', count: { $sum: 1 } } }
    ]);

    // Recent enquiries
    const recentEnquiries = await Enquiry.find(dateFilter)
      .sort('-createdAt')
      .limit(5)
      .select('name email phone message serviceType status createdAt');

    // Conversion rate
    const conversionRate = totalEnquiries > 0 
      ? ((convertedLeads / totalEnquiries) * 100).toFixed(2) 
      : 0;

    res.status(200).json({
      success: true,
      data: {
        totalEnquiries,
        newEnquiries,
        qualifiedLeads,
        convertedLeads,
        conversionRate: parseFloat(conversionRate),
        recentEnquiries,
        breakdowns: {
          byStatus: statusBreakdown,
          byServiceType: serviceTypeBreakdown,
          bySource: sourceBreakdown
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
