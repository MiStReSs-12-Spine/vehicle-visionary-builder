
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BarChart3,
  Car,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  PanelLeft,
  Route,
  Truck,
  CarFront,
  Users,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    active: true,
  },
  {
    title: "Reports",
    icon: FileText,
    href: "/reports",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "HR",
    icon: Users,
    href: "/hr",
    subItems: [
      { title: "Dashboards", href: "/hr" },
      { title: "Attendance", href: "/hr?tab=attendance" },
      { title: "Leave", href: "/hr?tab=leave" },
      { title: "Attrition", href: "/hr?tab=attrition" },
      { title: "Compliance", href: "/hr?tab=compliance" },
      { title: "Overtime", href: "/hr?tab=overtime" },
      { title: "Report Builder", href: "/hr?tab=builder" },
    ]
  },
  {
    title: "Fleet",
    icon: Car,
    href: "/fleet",
  },
  {
    title: "Vehicles",
    icon: CarFront,
    href: "/vehicles",
  },
  {
    title: "Routes",
    icon: Route,
    href: "/routes",
  },
  {
    title: "Logistics",
    icon: Truck,
    href: "/logistics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSubMenu = (title: string) => {
    setExpandedItems((current) => 
      current.includes(title) 
        ? current.filter(item => item !== title) 
        : [...current, title]
    );
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <PanelLeft className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-sidebar-foreground">Fleet Analytics</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:flex text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            {navigation.map((item) => (
              <div key={item.title}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleSubMenu(item.title)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        item.active
                          ? "bg-sidebar-accent text-primary"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-foreground"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        {item.title}
                      </div>
                      {expandedItems.includes(item.title) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {expandedItems.includes(item.title) && (
                      <div className="pl-10 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.title}
                            to={subItem.href}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/70"
                          >
                            <span className="h-1 w-1 rounded-full bg-sidebar-foreground/70"></span>
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      item.active
                        ? "bg-sidebar-accent text-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                    {item.active && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-sidebar-border p-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
