import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from "recharts";

const COLORS = ["hsl(38,92%,50%)", "hsl(200,80%,45%)", "hsl(142,60%,40%)"];

const resolutionTime = [
  { range: "<1 day", count: 3 },
  { range: "1-3 days", count: 8 },
  { range: "3-7 days", count: 5 },
  { range: ">7 days", count: 2 },
];

export default function AdminAnalytics() {
  const { complaints, loadComplaints } = useAppStore();

  useEffect(() => {
    loadComplaints();
  }, [loadComplaints]);

  const statusData = [
    { name: "Pending", value: complaints.filter((c) => c.status === "pending").length },
    { name: "In Progress", value: complaints.filter((c) => c.status === "in-progress").length },
    { name: "Resolved", value: complaints.filter((c) => c.status === "resolved").length },
  ];

  const categoryData = [
    { name: "Complaint", count: complaints.filter((c) => c.category === "complaint").length },
    { name: "Query", count: complaints.filter((c) => c.category === "query").length },
    { name: "Support", count: complaints.filter((c) => c.category === "support").length },
  ];

  const priorityData = [
    { name: "Low", count: complaints.filter((c) => c.priority === "low").length },
    { name: "Medium", count: complaints.filter((c) => c.priority === "medium").length },
    { name: "High", count: complaints.filter((c) => c.priority === "high").length },
  ];

  const downloadCSV = () => {
    const header = "Ticket ID,Title,Category,Priority,Status,User,Created At\n";
    const rows = complaints.map((c) =>
      `${c.ticketId},"${c.title}",${c.category},${c.priority},${c.status},${c.userName},${c.createdAt}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "complaints_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold">Analytics & Reports</h1>
            <p className="text-sm text-muted-foreground">Comprehensive complaint statistics</p>
          </div>
          <Button onClick={downloadCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" /> Download CSV
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-heading">By Status</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" outerRadius={65} dataKey="value" label>
                    {statusData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-heading">By Category</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(213,62%,35%)" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-heading">By Priority</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(38,92%,50%)" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-heading">Resolution Time Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={resolutionTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(142,60%,40%)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
