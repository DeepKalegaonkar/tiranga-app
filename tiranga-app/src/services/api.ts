// API Service Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      console.log('API Request:', url, options);

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // Important for cookies
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Public endpoints
  async submitEnquiry(formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
    city?: string;
    state?: string;
    serviceType?: string;
    source?: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/enquiries', {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        source: formData.source || 'website',
      }),
    });
  }

  async getTestimonials(): Promise<ApiResponse<any>> {
    return this.request('/testimonials');
  }

  // Admin endpoints (require authentication)
  async login(email: string, password: string): Promise<ApiResponse<any>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getDashboardStats(token: string): Promise<ApiResponse<any>> {
    return this.request('/enquiries/stats/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getEnquiries(token: string, params?: any): Promise<ApiResponse<any>> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request(`/enquiries${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateEnquiry(
    token: string,
    id: string,
    data: any
  ): Promise<ApiResponse<any>> {
    return this.request(`/enquiries/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  async deleteEnquiry(token: string, id: string): Promise<ApiResponse<any>> {
    return this.request(`/enquiries/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async exportEnquiries(token: string, params?: any): Promise<Blob> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await fetch(
      `${this.baseUrl}/enquiries/export/excel${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Export failed');
    }

    return response.blob();
  }
}

export const api = new ApiService(API_BASE_URL);
export default api;
