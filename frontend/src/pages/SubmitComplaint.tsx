import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Category } from "@/lib/types";
import { toast } from "sonner";
import { FilePlus, Upload } from "lucide-react";

export default function SubmitComplaint() {
  const navigate = useNavigate();
  const { addComplaint } = useAppStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("complaint");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ticketId = await addComplaint({ title, description, category, isAnonymous, attachmentName: fileName || undefined });
      toast.success(`Complaint submitted! Ticket ID: ${ticketId}`, { duration: 5000 });
      navigate("/complaints");
    } catch (err) {
      toast.error("Failed to submit complaint");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <FilePlus className="h-5 w-5 text-primary" />
              <CardTitle className="font-heading">Submit a Complaint</CardTitle>
            </div>
            <CardDescription>Fill in the details below. You will receive a unique ticket ID for tracking.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="title">Complaint Title</Label>
                <Input
                  id="title"
                  placeholder="Brief title describing the issue"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  maxLength={200}
                />
              </div>

              <div>
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  placeholder="Provide detailed information about your complaint..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={5}
                  maxLength={2000}
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="complaint">Complaint</SelectItem>
                    <SelectItem value="query">Query</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="file">Attachment (optional)</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Button type="button" variant="outline" size="sm" onClick={() => {
                    setFileName("sample_evidence.pdf");
                    toast.info("File attached (demo mode)");
                  }}>
                    <Upload className="h-3 w-3 mr-1" />
                    Choose File
                  </Button>
                  {fileName && <span className="text-xs text-muted-foreground">{fileName}</span>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} id="anon" />
                <Label htmlFor="anon" className="text-sm cursor-pointer">
                  Submit anonymously
                </Label>
              </div>

              <Button type="submit" className="w-full">
                Submit Complaint
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
