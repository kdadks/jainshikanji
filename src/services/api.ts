/**
 * API Service for Cloudflare Workers Backend
 * 
 * This service handles all API calls to the Cloudflare Workers backend.
 * Update the base URL based on your deployment:
 * - Development: http://localhost:8787 (wrangler dev)
 * - Production: https://jainshikanji.<your-subdomain>.workers.dev
 */

const API_BASE_URL = import.meta.env.PROD 
  ? '/api' // In production, same origin
  : 'http://localhost:8787/api'; // Local wrangler dev

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Health Check
  async healthCheck() {
    return this.request('/health');
  }

  // Products API
  async getProducts() {
    return this.request('/products');
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  async createProduct(product: any) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async updateProduct(id: string, product: any) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Orders API
  async createOrder(order: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`);
  }

  async getOrders(userId?: string) {
    const query = userId ? `?userId=${userId}` : '';
    return this.request(`/orders${query}`);
  }

  async updateOrderStatus(id: string, status: string) {
    return this.request(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Cart API
  async updateCart(cart: any) {
    return this.request('/cart', {
      method: 'POST',
      body: JSON.stringify(cart),
    });
  }

  async getCart(userId: string) {
    return this.request(`/cart/${userId}`);
  }

  // Payment API
  async initiatePayment(paymentData: any) {
    return this.request('/payment/initiate', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async verifyPayment(paymentId: string, signature: string) {
    return this.request('/payment/verify', {
      method: 'POST',
      body: JSON.stringify({ paymentId, signature }),
    });
  }

  // Customer API
  async getCustomer(id: string) {
    return this.request(`/customers/${id}`);
  }

  async updateCustomer(id: string, customer: any) {
    return this.request(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customer),
    });
  }

  // Analytics API
  async getDashboardAnalytics() {
    return this.request('/analytics/dashboard');
  }
}

export const apiService = new ApiService();
export default apiService;
