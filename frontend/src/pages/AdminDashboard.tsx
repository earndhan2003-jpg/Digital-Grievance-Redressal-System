import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { ComplaintCard } from "@/components/ComplaintCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Clock, CheckCircle, AlertTriangle, TrendingUp, Users } from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line, CartesianGrid, Legend, AreaChart, Area,
} from "recharts";

const COLORS = ["hsl(38, 92%, 50%)", "hsl(200, 80%, 45%)", "hsl(142, 60%, 40%)", "hsl(0, 70%, 50%)"];

const monthlyTrends = [
  { month: "Oct", complaints: 12, resolved: 8 },
  { month: "Nov", complaints: 18, resolved: 14 },
  { month: "Dec", complaints: 22, resolved: 17 },
  { month: "Jan", complaints: 15, resolved: 13 },
  { month: "Feb", complaints: 20, resolved: 16 },
  { month: "Mar", complaints: 25, resolved: 19 },
  { month: "Apr", complaints: 10, resolved: 6 },
];

const resolutionPerformance = [
  { month: "Oct", avgDays: 5.2 },
  { month: "Nov", avgDays: 4.8 },
  { month: "Dec", avgDays: 6.1 },
  { month: "Jan", avgDays: 3.9 },
  { month: "Feb", avgDays: 4.2 },
  { month: "Mar", avgDays: 3.5 },
  { month: "Apr", avgDays: 2.8 },
];

export default function AdminDashboard() {
  const { complaints, users } = useAppStore();
  const pending = complaints.filter((c) => c.status === "pending").length;
  const inProgress = complaints.filter((c) => c.status === "in-progress").length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;
  const highPriority = complaints.filter((c) => c.priority === "high" && c.status !== "resolved");
  const totalUsers = users.filter((u) => u.role === "user").length;

  const pieData = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: inProgress },
    { name: "Resolved", value: resolved },
  ];

  const categoryData = [
    { name: "Complaint", count: complaints.filter((c) => c.category === "complaint").length },
    { name: "Query", count: complaints.filter((c) => c.category === "query").length },
    { name: "Support", count: complaints.filter((c) => c.category === "support").length },
  ];

  const satisfactionRate = complaints.length > 0 ? Math.round((resolved / complaints.length) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Overview of grievance management system</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard title="Total Tickets" value={complaints.length} icon={ClipboardList} variant="primary" />
          <StatCard title="Pending" value={pending} icon={Clock} variant="warning" />
          <StatCard title="In Progress" value={inProgress} icon={TrendingUp} />
          <StatCard title="Resolved" value={resolved} icon={CheckCircle} variant="success" />
          <StatCard title="High Priority" value={highPriority.length} icon={AlertTriangle} variant="warning" />
          <StatCard title="Users" value={totalUsers} icon={Users} variant="primary" />
        </div>

        {/* Charts Row 1 */}
        <div className="grid md:grid-cols-2 gap-5">
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-heading">Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-heading">Complaint Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(213, 62%, 35%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid md:grid-cols-2 gap-5">
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-heading">Monthly Complaint Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="complaints" stroke="hsl(38, 92%, 50%)" fill="hsl(38, 92%, 50%)" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="resolved" stroke="hsl(142, 60%, 40%)" fill="hsl(142, 60%, 40%)" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-heading">Resolution Performance (Avg Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={resolutionPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgDays" stroke="hsl(200, 80%, 45%)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Satisfaction + AI Insights */}
        <div className="grid md:grid-cols-3 gap-5">
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-heading">Satisfaction Rate</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-4">
              <div className="text-4xl font-bold text-primary">{satisfactionRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">Based on resolved tickets</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in col-span-1 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-heading flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-foreground">92%</p>
                  <p className="text-xs text-muted-foreground">Category Accuracy</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">87%</p>
                  <p className="text-xs text-muted-foreground">Priority Prediction</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">0.94</p>
                  <p className="text-xs text-muted-foreground">Confidence Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* High Priority */}
        <div>
          <h2 className="text-lg font-heading font-bold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            High Priority (Unresolved)
          </h2>
          <div className="space-y-3">
            {highPriority.length === 0 ? (
              <p className="text-sm text-muted-foreground">No high-priority unresolved tickets.</p>
            ) : (
              highPriority.map((c) => <ComplaintCard key={c.id} complaint={c} />)
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
