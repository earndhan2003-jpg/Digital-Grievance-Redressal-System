import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, Bell, Shield, Palette } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();
  const [emailNotif, setEmailNotif] = useState(true);
  const [autoAssign, setAutoAssign] = useState(false);
  const [aiClassify, setAiClassify] = useState(true);

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your preferences have been updated." });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
            <Settings className="h-6 w-6" /> Settings
          </h1>
          <p className="text-sm text-muted-foreground">Manage system preferences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications</CardTitle>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notif">Email notifications for new complaints</Label>
              <Switch id="email-notif" checked={emailNotif} onCheckedChange={setEmailNotif} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4" /> AI & Automation</CardTitle>
            <CardDescription>Configure AI classification and auto-assignment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="ai-classify">AI auto-classification of complaints</Label>
              <Switch id="ai-classify" checked={aiClassify} onCheckedChange={setAiClassify} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-assign">Auto-assign tickets to officers</Label>
              <Switch id="auto-assign" checked={autoAssign} onCheckedChange={setAutoAssign} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Palette className="h-4 w-4" /> System Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Version: 1.0.0</p>
            <p>Environment: Development (Mock Data)</p>
            <p>Backend: FastAPI (Planned)</p>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full">Save Settings</Button>
      </div>
    </DashboardLayout>
  );
}
