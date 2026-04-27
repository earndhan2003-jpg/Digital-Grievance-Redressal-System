import { Complaint } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const statusLabel: Record<string, string> = {
  pending: "Pending",
  "in-progress": "In Progress",
  resolved: "Resolved",
};

const statusClass: Record<string, string> = {
  pending: "status-pending",
  "in-progress": "status-in-progress",
  resolved: "status-resolved",
};

const priorityLabel: Record<string, string> = {
  low: "Low", medium: "Medium", high: "High",
};

const priorityClass: Record<string, string> = {
  low: "priority-low", medium: "priority-medium", high: "priority-high",
};

interface Props {
  complaint: Complaint;
  showActions?: boolean;
}

export function ComplaintCard({ complaint, showActions = true }: Props) {
  const navigate = useNavigate();

  return (
    <Card className="animate-fade-in hover:shadow-md transition-shadow">
      <CardHeader className="pb-2 flex flex-row items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <code className="text-xs text-primary font-mono font-semibold">
              {complaint.ticketId}
            </code>
            <Badge className={`text-[10px] px-2 py-0.5 rounded-full ${statusClass[complaint.status]}`} variant="outline">
              {statusLabel[complaint.status]}
            </Badge>
            <Badge className={`text-[10px] px-2 py-0.5 rounded-full ${priorityClass[complaint.priority]}`} variant="outline">
              {priorityLabel[complaint.priority]}
            </Badge>
          </div>
          <h3 className="font-semibold text-sm truncate">{complaint.title}</h3>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {complaint.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="capitalize">{complaint.category}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {format(new Date(complaint.createdAt), "dd MMM yyyy")}
            </span>
            <span>by {complaint.userName}</span>
          </div>
          {showActions && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-7"
              onClick={() => navigate(`/complaint/${complaint.id}`)}
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              View
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
