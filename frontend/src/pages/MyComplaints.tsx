import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ComplaintCard } from "@/components/ComplaintCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

export default function MyComplaints() {
  const { currentUser, complaints, loadComplaints } = useAppStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadComplaints();
  }, [loadComplaints]);

  const myComplaints = complaints
    .filter((c) => c.userId === currentUser?.id)
    .filter((c) => statusFilter === "all" || c.status === statusFilter)
    .filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.ticketId.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-5">
        <h1 className="text-2xl font-heading font-bold">My Complaints</h1>

        <div className="flex gap-3">
          <Input
            placeholder="Search by title or ticket ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {myComplaints.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">No complaints found.</p>
          ) : (
            myComplaints.map((c) => <ComplaintCard key={c.id} complaint={c} />)
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
