export type TicketStatus = "pending" | "in-progress" | "resolved";
export type Priority = "low" | "medium" | "high";
export type Category = "complaint" | "query" | "support";
export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Complaint {
  id: string;
  ticketId: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: TicketStatus;
  userId: string;
  userName: string;
  isAnonymous: boolean;
  attachmentUrl?: string;
  attachmentName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  complaintId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  createdAt: string;
}
