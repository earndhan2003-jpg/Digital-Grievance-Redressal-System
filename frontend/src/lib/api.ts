const API_BASE_URL = 'http://localhost:8000';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  mobile?: string;
}

export interface AuthResponse {
  ok: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface CreateComplaintRequest {
  title: string;
  description: string;
  category: 'complaint' | 'query' | 'support';
  priority?: 'low' | 'medium' | 'high';
  is_anonymous?: boolean;
  user_email?: string;
}

export interface ComplaintResponse {
  id: string;
  ticket_id: string;
  title: string;
  description: string;
  category: 'complaint' | 'query' | 'support';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'resolved';
  user_id: string;
  user_name: string;
  is_anonymous: boolean;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private transformComplaint(apiComplaint: ComplaintResponse): any {
    return {
      id: apiComplaint.id,
      ticketId: apiComplaint.ticket_id,
      title: apiComplaint.title,
      description: apiComplaint.description,
      category: apiComplaint.category,
      priority: apiComplaint.priority,
      status: apiComplaint.status,
      userId: apiComplaint.user_id,
      userName: apiComplaint.user_name,
      isAnonymous: apiComplaint.is_anonymous,
      createdAt: new Date().toISOString(), // Placeholder
      updatedAt: new Date().toISOString(), // Placeholder
    };
  }

  private transformUser(apiUser: UserResponse): any {
    return {
      id: apiUser.id,
      name: apiUser.name,
      email: apiUser.email,
      role: apiUser.role as 'user' | 'admin',
    };
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async adminLogin(data: LoginRequest): Promise<AuthResponse> {
    return this.request('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async register(data: RegisterUserRequest): Promise<AuthResponse> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getComplaints(): Promise<any[]> {
    const complaints = await this.request<ComplaintResponse[]>('/complaints');
    return complaints.map(this.transformComplaint);
  }

  async createComplaint(data: CreateComplaintRequest): Promise<any> {
    const complaint = await this.request<ComplaintResponse>('/complaints', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return this.transformComplaint(complaint);
  }

  async getUsers(): Promise<any[]> {
    const users = await this.request<UserResponse[]>('/users');
    return users.map(this.transformUser);
  }

  async health(): Promise<{ status: string }> {
    return this.request('/health');
  }
}

export const api = new ApiService();