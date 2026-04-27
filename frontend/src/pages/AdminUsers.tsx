import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Eye, UserCheck, UserX } from "lucide-react";
import { ComplaintCard } from "@/components/ComplaintCard";

export default function AdminUsers() {
  const { users, complaints } = useAppStore();
  const [search, setSearch] = useState("");
  const [deactivated, setDeactivated] = useState<Set<string>>(new Set());

  const citizenUsers = users.filter((u) => u.role === "user");
  const filtered = citizenUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (userId: string) => {
    setDeactivated((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
              <Users className="h-6 w-6" /> Users Management
            </h1>
            <p className="text-sm text-muted-foreground">{citizenUsers.length} registered citizens</p>
          </div>
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Complaints</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user) => {
                  const userComplaints = complaints.filter((c) => c.userId === user.id);
                  const isActive = !deactivated.has(user.id);
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{userComplaints.length}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={isActive ? "default" : "destructive"}>
                          {isActive ? "Active" : "Deactivated"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3 mr-1" /> History
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[70vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{user.name}'s Complaints</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3 mt-3">
                              {userComplaints.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No complaints filed.</p>
                              ) : (
                                userComplaints.map((c) => <ComplaintCard key={c.id} complaint={c} />)
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant={isActive ? "destructive" : "default"}
                          size="sm"
                          onClick={() => toggleActive(user.id)}
                        >
                          {isActive ? (
                            <><UserX className="h-3 w-3 mr-1" /> Deactivate</>
                          ) : (
                            <><UserCheck className="h-3 w-3 mr-1" /> Activate</>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
