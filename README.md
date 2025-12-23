# Tiranga Green Energy Solutions

A complete full-stack web application for Tiranga Green Energy Solutions - a solar energy company website with an admin panel for managing enquiries and leads.

## 📦 Project Structure

```
tiranga/
├── tiranga-app/          # Frontend React application
├── tiranga-backend/      # Backend Node.js API
└── README.md            # This file
```

## 🌟 Features

### Frontend (React + TypeScript + Vite)
- **Modern Landing Page** with hero section, services showcase, and contact form
- **Responsive Design** - Works on all devices (mobile, tablet, desktop)
- **Google reCAPTCHA** integration for form protection
- **Material-UI (MUI v7)** components with custom theming
- **Admin Panel** with authentication and dashboard
- **Enquiry Management** with expandable rows and status tracking
- **Real-time Statistics** - Total, new, qualified, and converted leads
- **Excel Export** functionality for enquiries

### Backend (Node.js + Express + MongoDB)
- **JWT Authentication** - Secure admin login
- **RESTful API** with complete CRUD operations
- **Email Notifications** - Automated alerts for new enquiries
- **Dashboard Analytics** - Real-time metrics and conversion rates
- **Lead Status Workflow** - new → contacted → qualified → converted/rejected
- **Excel Export** - Download enquiries as spreadsheet
- **Security** - Helmet.js, CORS, rate limiting, input validation

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB v4.4+
- npm or yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd tiranga
```

### 2. Backend Setup

```bash
cd tiranga-backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Create super admin
node src/seeder.js --create

# Start backend server
npm run dev
```

Backend runs on: `http://localhost:5000`

**Default Admin Credentials:**
- Email: `admin@tirangagreenenergy.com`
- Password: `Admin@123456`

⚠️ **Change password after first login!**

### 3. Frontend Setup

```bash
cd tiranga-app
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start frontend dev server
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 🔧 Environment Configuration

### Backend (.env)
```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/tiranga_green_energy

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Email (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@tirangagreenenergy.com
ADMIN_EMAIL=admin@tirangagreenenergy.com

# Google reCAPTCHA
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key

# Frontend
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

## 📧 Email Configuration (Gmail)

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password:
   - Go to Google Account → Security → 2-Step Verification → App Passwords
   - Select "Mail" and generate password
3. Use generated password in `SMTP_PASS`

## 🔑 Google reCAPTCHA Setup

1. Go to https://www.google.com/recaptcha/admin
2. Register your site (use reCAPTCHA v2 "I'm not a robot" checkbox)
3. Add domains:
   - localhost (for development)
   - your-production-domain.com
4. Copy Site Key to frontend `.env` → `VITE_RECAPTCHA_SITE_KEY`
5. Copy Secret Key to backend `.env` → `RECAPTCHA_SECRET_KEY`

## 📚 API Endpoints

### Authentication (`/api/auth`)
- `POST /login` - Admin login
- `GET /me` - Get current admin
- `GET /logout` - Logout admin
- `PUT /updatepassword` - Update password

### Enquiries (`/api/enquiries`)
- `POST /` - Create enquiry (public)
- `GET /` - Get all enquiries (private)
- `GET /:id` - Get single enquiry (private)
- `PUT /:id` - Update enquiry (private)
- `DELETE /:id` - Delete enquiry (private)
- `POST /:id/notes` - Add note (private)
- `GET /stats/dashboard` - Dashboard stats (private)
- `GET /export/excel` - Export to Excel (private)

### Testimonials (`/api/testimonials`)
- `POST /` - Create testimonial (private)
- `GET /` - Get all testimonials (public)
- `GET /:id` - Get single testimonial (public)
- `PUT /:id` - Update testimonial (private)
- `DELETE /:id` - Delete testimonial (private)

## 🎯 Lead Status Workflow

```
new → contacted → qualified → converted
                        ↓
                    rejected
```

- **New**: Fresh enquiry from website
- **Contacted**: Admin has reached out
- **Qualified**: Potential customer (interested)
- **Converted**: Successfully closed deal
- **Rejected**: Not interested or unsuitable

## 📊 Dashboard Metrics

- **Total Enquiries**: All time enquiry count
- **New Enquiries**: Uncontacted leads
- **Qualified Leads**: Potential customers
- **Converted Leads**: Successful sales
- **Conversion Rate**: (Converted / Total) × 100%

## 🗂️ Technologies Used

### Frontend
- React 19
- TypeScript
- Vite
- Material-UI (MUI) v7
- React Router v6
- Google reCAPTCHA

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Nodemailer
- bcryptjs
- XLSX (Excel export)
- Express Validator
- Helmet.js
- CORS

## 🛠️ Development Commands

### Backend
```bash
npm run dev      # Start with auto-reload
npm start        # Production mode
node src/seeder.js --create   # Create super admin
node src/seeder.js --import   # Import sample data
node src/seeder.js --delete   # Delete all data
```

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📦 Building for Production

### Backend
```bash
cd tiranga-backend
npm install --production
NODE_ENV=production node src/server.js
```

### Frontend
```bash
cd tiranga-app
npm run build
# Deploy dist/ folder to your hosting
```

## 🚢 Deployment Options

### Backend Deployment
- **Heroku**: Simple PaaS deployment
- **DigitalOcean/AWS EC2**: VPS with PM2 + Nginx
- **Vercel**: Serverless deployment
- **Railway/Render**: Modern PaaS platforms

### Frontend Deployment
- **Vercel**: Recommended for Vite apps
- **Netlify**: Easy static hosting
- **GitHub Pages**: Free hosting
- **AWS S3 + CloudFront**: Scalable CDN

### Database
- **MongoDB Atlas**: Free tier available, recommended for production
- **Self-hosted**: On VPS alongside backend

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet.js security headers
- Input validation and sanitization
- XSS protection
- CSRF protection via reCAPTCHA

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod

# Or start service
sudo systemctl start mongod
```

### Port Already in Use
Change `PORT` in backend `.env` to another port (e.g., 5001)

### Email Not Sending
- Verify Gmail 2FA is enabled
- Check App Password is correct (not regular password)
- Ensure SMTP credentials are in `.env`

### reCAPTCHA Not Working
- Verify Site Key and Secret Key match
- Check domain is added in reCAPTCHA admin
- For localhost, ensure "localhost" is in allowed domains

### Frontend Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 Project Highlights

### Key Pages (Frontend)
1. **Home** (`/`) - Landing page with hero, features, services
2. **About** (`/about`) - Company information
3. **Services** (`/services`) - Solar solutions offered
4. **Projects** (`/projects`) - Portfolio showcase
5. **Contact** (`/contact`) - Contact form with reCAPTCHA
6. **Admin Login** (`/admin/login`) - Secure admin access
7. **Admin Dashboard** (`/admin/dashboard`) - Analytics and stats
8. **Enquiries** (`/admin/enquiries`) - Lead management

### Notable Features
- **Expandable Enquiry Rows**: Click to view full details
- **Context-aware Actions**: Buttons change based on enquiry status
- **Logout Confirmation**: Prevents accidental logout
- **Live Statistics**: Real-time dashboard updates
- **Excel Export**: Download filtered enquiries
- **Email Templates**: Professional HTML emails
- **Responsive Design**: Mobile-first approach

## 📄 License

ISC

## 👨‍💻 Support

For issues or questions:
- Email: support@tirangagreenenergy.com
- Create an issue in the repository

---

**Built with ❤️ for Tiranga Green Energy Solutions**
