import { create } from "zustand";
import { Complaint, Message, User, TicketStatus, Priority, Category } from "./types";
import { api } from "./api";
import { mockMessages } from "./mock-data"; // Keep messages mock for now

interface AppState {
  currentUser: User | null;
  complaints: Complaint[];
  messages: Message[];
  users: User[];
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  registerUser: (name: string, email: string, password: string, mobile?: string) => Promise<boolean>;

  loadComplaints: () => Promise<void>;
  loadUsers: () => Promise<void>;
  addComplaint: (data: {
    title: string;
    description: string;
    category: Category;
    priority?: Priority;
    isAnonymous?: boolean;
    userEmail?: string;
  }) => Promise<string>;

  updateComplaintStatus: (id: string, status: TicketStatus) => void;
  updateComplaintPriority: (id: string, priority: Priority) => void;
  addMessage: (complaintId: string, content: string) => void;
  getComplaintMessages: (complaintId: string) => Message[];
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  complaints: [],
  messages: mockMessages,
  users: [],
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const isAdmin = email.endsWith("@gov.in");
      const response = isAdmin
        ? await api.adminLogin({ email, password })
        : await api.login({ email, password });

      if (response.ok && response.user) {
        set({ currentUser: response.user as User, loading: false });
        return true;
      }

      set({ error: response.message, loading: false });
      return false;
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
      return false;
    }
  },

  logout: () => set({ currentUser: null }),

  registerUser: async (name, email, password, mobile) => {
    set({ loading: true, error: null });
    try {
      const response = await api.register({ name, email, password, mobile });
      if (response.ok) {
        set({ loading: false });
        return true;
      }
      set({ error: response.message, loading: false });
      return false;
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
      return false;
    }
  },

  loadComplaints: async () => {
    set({ loading: true, error: null });
    try {
      const complaints = await api.getComplaints();
      set({ complaints, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  loadUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await api.getUsers();
      set({ users, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  addComplaint: async (data) => {
    set({ loading: true, error: null });
    try {
      const complaint = await api.createComplaint({
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority || "medium",
        is_anonymous: data.isAnonymous,
        user_email: data.userEmail,
      });
      set((state) => ({ complaints: [complaint, ...state.complaints], loading: false }));
      return complaint.ticketId;
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
      throw err;
    }
  },

  updateComplaintStatus: (id, status) => {
    set((state) => ({
      complaints: state.complaints.map((c) =>
        c.id === id ? { ...c, status } : c
      ),
    }));
  },

  updateComplaintPriority: (id, priority) => {
    set((state) => ({
      complaints: state.complaints.map((c) =>
        c.id === id ? { ...c, priority } : c
      ),
    }));
  },

  addMessage: (complaintId, content) => {
    const user = get().currentUser;
    if (!user) return;

    const message: Message = {
      id: Date.now().toString(),
      complaintId,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      content,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({ messages: [...state.messages, message] }));
  },

  getComplaintMessages: (complaintId) => {
    return get().messages.filter((m) => m.complaintId === complaintId);
  },
}));
