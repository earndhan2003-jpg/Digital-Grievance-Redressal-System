import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant?: "default" | "primary" | "warning" | "success";
}

const variantStyles = {
  default: "bg-card",
  primary: "bg-primary/5 border-primary/20",
  warning: "bg-warning/5 border-warning/20",
  success: "bg-success/5 border-success/20",
};

const iconStyles = {
  default: "text-muted-foreground",
  primary: "text-primary",
  warning: "text-warning",
  success: "text-success",
};

export function StatCard({ title, value, icon: Icon, variant = "default" }: StatCardProps) {
  return (
    <Card className={`${variantStyles[variant]} animate-fade-in`}>
      <CardContent className="flex items-center gap-4 p-5">
        <div className={`p-3 rounded-lg bg-background/80 ${iconStyles[variant]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-2xl font-bold font-heading">{value}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
