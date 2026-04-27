import { useParams } from "react-router-dom";
import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Send, User, Shield } from "lucide-react";
import { TicketStatus, Priority } from "@/lib/types";

export default function ComplaintDetail() {
  const { id } = useParams<{ id: string }>();
  const { complaints, currentUser, messages, addMessage, updateComplaintStatus, updateComplaintPriority } = useAppStore();
  const complaint = complaints.find((c) => c.id === id);
  const complaintMessages = messages.filter((m) => m.complaintId === id);
  const [newMsg, setNewMsg] = useState("");
  const isAdmin = currentUser?.role === "admin";

  if (!complaint) {
    return (
      <DashboardLayout>
        <p className="text-center text-muted-foreground py-12">Complaint not found.</p>
      </DashboardLayout>
    );
  }

  const handleSendMessage = () => {
    if (!newMsg.trim()) return;
    addMessage(complaint.id, newMsg.trim());
    setNewMsg("");
    toast.success("Message sent");
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-5">
        <Card className="animate-fade-in">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <code className="text-xs text-primary font-mono font-semibold">{complaint.ticketId}</code>
                <CardTitle className="font-heading mt-1">{complaint.title}</CardTitle>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className={`status-${complaint.status === "in-progress" ? "in-progress" : complaint.status}`}>
                  {complaint.status}
                </Badge>
                <Badge variant="outline" className={`priority-${complaint.priority}`}>
                  {complaint.priority}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{complaint.description}</p>
            <div className="flex gap-4 text-xs text-muted-foreground flex-wrap">
              <span>Category: <strong className="capitalize">{complaint.category}</strong></span>
              <span>Submitted: {format(new Date(complaint.createdAt), "dd MMM yyyy, HH:mm")}</span>
              <span>By: {complaint.userName}</span>
              {complaint.attachmentName && <span>📎 {complaint.attachmentName}</span>}
            </div>

            {isAdmin && (
              <div className="flex gap-3 pt-2 border-t">
                <div>
                  <label className="text-xs text-muted-foreground">Status</label>
                  <Select
                    value={complaint.status}
                    onValueChange={(v) => {
                      updateComplaintStatus(complaint.id, v as TicketStatus);
                      toast.success("Status updated");
                    }}
                  >
                    <SelectTrigger className="w-36 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Priority</label>
                  <Select
                    value={complaint.priority}
                    onValueChange={(v) => {
                      updateComplaintPriority(complaint.id, v as Priority);
                      toast.success("Priority updated");
                    }}
                  >
                    <SelectTrigger className="w-32 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Messages */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-heading">Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {complaintMessages.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No messages yet.</p>
            )}
            {complaintMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 p-3 rounded-lg ${
                  msg.senderRole === "admin" ? "bg-primary/5" : "bg-muted"
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {msg.senderRole === "admin" ? (
                    <Shield className="h-4 w-4 text-primary" />
                  ) : (
                    <User className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold">{msg.senderName}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {format(new Date(msg.createdAt), "dd MMM, HH:mm")}
                    </span>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}

            <div className="flex gap-2 pt-2 border-t">
              <Textarea
                placeholder="Type your message..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                rows={2}
                className="resize-none"
              />
              <Button onClick={handleSendMessage} size="icon" className="self-end">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
