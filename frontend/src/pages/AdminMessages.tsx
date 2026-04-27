import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function AdminMessages() {
  const { complaints, messages } = useAppStore();
  const navigate = useNavigate();

  const complaintsWithMessages = complaints
    .map((c) => ({
      ...c,
      lastMessage: messages
        .filter((m) => m.complaintId === c.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0],
      messageCount: messages.filter((m) => m.complaintId === c.id).length,
    }))
    .filter((c) => c.messageCount > 0)
    .sort((a, b) =>
      new Date(b.lastMessage?.createdAt || 0).getTime() -
      new Date(a.lastMessage?.createdAt || 0).getTime()
    );

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-5">
        <h1 className="text-2xl font-heading font-bold">Messages</h1>

        <div className="space-y-3">
          {complaintsWithMessages.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No messages yet.</p>
          ) : (
            complaintsWithMessages.map((c) => (
              <Card key={c.id} className="animate-fade-in hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/complaint/${c.id}`)}>
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <code className="text-xs text-primary font-mono">{c.ticketId}</code>
                      <span className="text-xs text-muted-foreground">
                        {c.messageCount} message(s)
                      </span>
                    </div>
                    <p className="text-sm font-medium truncate">{c.title}</p>
                    {c.lastMessage && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {c.lastMessage.senderName}: {c.lastMessage.content}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {c.lastMessage && format(new Date(c.lastMessage.createdAt), "dd MMM")}
                  </span>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
