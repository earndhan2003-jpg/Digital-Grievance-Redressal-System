import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplaintCard } from "@/components/ComplaintCard";
import { Search } from "lucide-react";

export default function TrackTicket() {
  const { complaints } = useAppStore();
  const [ticketId, setTicketId] = useState("");
  const [found, setFound] = useState<typeof complaints[0] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = complaints.find(
      (c) => c.ticketId.toLowerCase() === ticketId.trim().toLowerCase()
    );
    setFound(result || null);
    setSearched(true);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Track Your Ticket
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Enter Ticket ID (e.g. GRV-2026-0001)"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                required
              />
              <Button type="submit">Track</Button>
            </form>
          </CardContent>
        </Card>

        {searched && (
          found ? (
            <ComplaintCard complaint={found} />
          ) : (
            <p className="text-center text-sm text-muted-foreground py-4">
              No ticket found with ID "{ticketId}"
            </p>
          )
        )}
      </div>
    </DashboardLayout>
  );
}
