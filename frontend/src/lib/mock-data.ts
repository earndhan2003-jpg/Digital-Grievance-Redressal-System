import { Complaint, Message, User } from "./types";

export const mockUsers: User[] = [
  { id: "u1", name: "Rajesh Kumar", email: "rajesh@example.com", role: "user" },
  { id: "u2", name: "Priya Sharma", email: "priya@example.com", role: "user" },
  { id: "admin1", name: "Admin Officer", email: "admin@gov.in", role: "admin" },
];

export const mockComplaints: Complaint[] = [
  {
    id: "c1", ticketId: "GRV-2026-0001", title: "Water supply disruption in Sector 12",
    description: "There has been no water supply for the past 3 days in our locality. Multiple families are affected and we have contacted the local office but received no response.",
    category: "complaint", priority: "high", status: "in-progress",
    userId: "u1", userName: "Rajesh Kumar", isAnonymous: false,
    createdAt: "2026-03-28T10:30:00Z", updatedAt: "2026-03-30T14:00:00Z",
  },
  {
    id: "c2", ticketId: "GRV-2026-0002", title: "Street light not working on MG Road",
    description: "The street lights on MG Road near the bus stop have been non-functional for two weeks, causing safety concerns for evening commuters.",
    category: "complaint", priority: "medium", status: "pending",
    userId: "u2", userName: "Priya Sharma", isAnonymous: false,
    createdAt: "2026-03-30T08:15:00Z", updatedAt: "2026-03-30T08:15:00Z",
  },
  {
    id: "c3", ticketId: "GRV-2026-0003", title: "Query about property tax assessment",
    description: "I would like to understand the recent property tax revision for residential properties in Zone B. The new rates seem higher than expected.",
    category: "query", priority: "low", status: "resolved",
    userId: "u1", userName: "Rajesh Kumar", isAnonymous: false,
    createdAt: "2026-03-20T12:00:00Z", updatedAt: "2026-04-01T09:30:00Z",
  },
  {
    id: "c4", ticketId: "GRV-2026-0004", title: "Garbage collection missed repeatedly",
    description: "Garbage collection has been irregular in Ward 5 for the past month. Waste is piling up and causing health hazards.",
    category: "complaint", priority: "high", status: "pending",
    userId: "u2", userName: "Anonymous", isAnonymous: true,
    createdAt: "2026-04-01T06:45:00Z", updatedAt: "2026-04-01T06:45:00Z",
  },
  {
    id: "c5", ticketId: "GRV-2026-0005", title: "Need help with birth certificate application",
    description: "I need assistance understanding the process for obtaining a birth certificate for my newborn. What documents are required?",
    category: "support", priority: "low", status: "resolved",
    userId: "u1", userName: "Rajesh Kumar", isAnonymous: false,
    createdAt: "2026-03-15T14:20:00Z", updatedAt: "2026-03-22T11:00:00Z",
  },
];

export const mockMessages: Message[] = [
  {
    id: "m1", complaintId: "c1", senderId: "u1", senderName: "Rajesh Kumar", senderRole: "user",
    content: "Please look into this urgently. Many families are suffering.", createdAt: "2026-03-28T10:35:00Z",
  },
  {
    id: "m2", complaintId: "c1", senderId: "admin1", senderName: "Admin Officer", senderRole: "admin",
    content: "We have notified the water department. A team will visit within 24 hours.", createdAt: "2026-03-29T09:00:00Z",
  },
  {
    id: "m3", complaintId: "c1", senderId: "u1", senderName: "Rajesh Kumar", senderRole: "user",
    content: "Thank you. We are waiting for the team.", createdAt: "2026-03-29T10:15:00Z",
  },
];
