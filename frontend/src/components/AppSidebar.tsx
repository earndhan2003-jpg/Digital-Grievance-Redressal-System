import {
  Home, FilePlus, Search, MessageSquare, BarChart3, LogOut, Shield, ClipboardList,
  Users, PieChart, Bell, Settings,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const userItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Submit Complaint", url: "/submit", icon: FilePlus },
  { title: "My Complaints", url: "/complaints", icon: ClipboardList },
  { title: "Track Ticket", url: "/track", icon: Search },
];

const adminItems = [
  { title: "Dashboard Overview", url: "/admin", icon: BarChart3 },
  { title: "Manage Complaints", url: "/admin/complaints", icon: ClipboardList },
  { title: "Chat Center", url: "/admin/messages", icon: MessageSquare },
  { title: "Users Management", url: "/admin/users", icon: Users },
  { title: "Analytics & Reports", url: "/admin/analytics", icon: PieChart },
  { title: "Notifications", url: "/admin/notifications", icon: Bell },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { currentUser, logout } = useAppStore();
  const isAdmin = currentUser?.role === "admin";

  const items = isAdmin ? adminItems : userItems;

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar">
        {!collapsed && (
          <div className="px-4 py-5">
            <div className="flex items-center gap-2">
              <Shield className="h-7 w-7 text-sidebar-primary" />
              <div>
                <h2 className="text-sm font-bold text-sidebar-foreground tracking-wide">
                  Grievance Portal
                </h2>
                <p className="text-[10px] text-sidebar-foreground/60 uppercase tracking-widest">
                  {isAdmin ? "Admin Panel" : "Public Service"}
                </p>
              </div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center py-4">
            <Shield className="h-6 w-6 text-sidebar-primary" />
          </div>
        )}

        <Separator className="bg-sidebar-border" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-[10px] uppercase tracking-widest">
            {isAdmin ? "Administration" : "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-sidebar border-t border-sidebar-border">
        {!collapsed && currentUser && (
          <div className="px-3 py-2">
            <p className="text-xs text-sidebar-foreground/70 truncate">{currentUser.name}</p>
            <p className="text-[10px] text-sidebar-foreground/50 truncate">{currentUser.email}</p>
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {!collapsed && <span>Logout</span>}
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
