import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck, AlertTriangle, MessageSquare, ClipboardList } from "lucide-react";

interface Notification {
  id: string;
  type: "complaint" | "message" | "alert";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: "n1", type: "complaint", title: "New complaint submitted", description: "GRV-2026-0004 — Garbage collection missed repeatedly", time: "2 hours ago", read: false },
  { id: "n2", type: "message", title: "New message from Rajesh Kumar", description: "Regarding ticket GRV-2026-0001", time: "5 hours ago", read: false },
  { id: "n3", type: "alert", title: "High priority ticket unresolved", description: "GRV-2026-0001 has been pending for 3+ days", time: "1 day ago", read: true },
  { id: "n4", type: "complaint", title: "Complaint resolved", description: "GRV-2026-0003 marked as resolved", time: "2 days ago", read: true },
  { id: "n5", type: "message", title: "New message from Priya Sharma", description: "Regarding ticket GRV-2026-0002", time: "3 days ago", read: true },
];

const iconMap = { complaint: ClipboardList, message: MessageSquare, alert: AlertTriangle };

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
              <Bell className="h-6 w-6" /> Notifications
            </h1>
            <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              <CheckCheck className="h-4 w-4 mr-1" /> Mark all read
            </Button>
          )}
        </div>

        <div className="space-y-2">
          {notifications.map((n) => {
            const Icon = iconMap[n.type];
            return (
              <Card
                key={n.id}
                className={`cursor-pointer transition-colors ${!n.read ? "border-primary/30 bg-primary/5" : ""}`}
                onClick={() => markRead(n.id)}
              >
                <CardContent className="flex items-start gap-3 p-4">
                  <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${!n.read ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-medium ${!n.read ? "text-foreground" : "text-muted-foreground"}`}>
                        {n.title}
                      </p>
                      {!n.read && <Badge variant="default" className="text-[10px] px-1.5 py-0">New</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.description}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-1">{n.time}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
