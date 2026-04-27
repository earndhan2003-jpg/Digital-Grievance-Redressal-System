import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { ComplaintCard } from "@/components/ComplaintCard";
import { ClipboardList, Clock, CheckCircle, AlertTriangle } from "lucide-react";

export default function UserDashboard() {
  const { currentUser, complaints } = useAppStore();
  const myComplaints = complaints.filter((c) => c.userId === currentUser?.id);
  const pending = myComplaints.filter((c) => c.status === "pending").length;
  const inProgress = myComplaints.filter((c) => c.status === "in-progress").length;
  const resolved = myComplaints.filter((c) => c.status === "resolved").length;
  const recent = myComplaints.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">
            Welcome, {currentUser?.name}
          </h1>
          <p className="text-sm text-muted-foreground">Here's an overview of your complaints</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total" value={myComplaints.length} icon={ClipboardList} variant="primary" />
          <StatCard title="Pending" value={pending} icon={Clock} variant="warning" />
          <StatCard title="In Progress" value={inProgress} icon={AlertTriangle} variant="default" />
          <StatCard title="Resolved" value={resolved} icon={CheckCircle} variant="success" />
        </div>

        <div>
          <h2 className="text-lg font-heading font-bold mb-3">Recent Complaints</h2>
          <div className="space-y-3">
            {recent.length === 0 ? (
              <p className="text-sm text-muted-foreground">No complaints yet. Submit your first one!</p>
            ) : (
              recent.map((c) => <ComplaintCard key={c.id} complaint={c} />)
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
