
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  PanelLeft,
  ChevronDown,
  ChevronRight,
  Users,
  UserCheck,
  Calendar,
  Clock,
  FileBarChart,
  ClipboardList,
  UserMinus
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navigation = [
  {
    title: "HR Dashboard",
    icon: LayoutDashboard,
    href: "/",
    active: true,
  },
  {
    title: "Employee Overview",
    icon: Users,
    href: "/?tab=dashboards",
    subItems: [
      { title: "Daily Report", href: "/?tab=dashboards&submenu=daily" },
      { title: "Monthly Summary", href: "/?tab=dashboards&submenu=monthly" },
      { title: "Department Analysis", href: "/?tab=dashboards&submenu=department" },
    ]
  },
  {
    title: "Attendance",
    icon: UserCheck,
    href: "/?tab=attendance",
    subItems: [
      { title: "Daily Report", href: "/?tab=attendance&submenu=daily" },
      { title: "Monthly Summary", href: "/?tab=attendance&submenu=monthly" },
      { title: "Absence Patterns", href: "/?tab=attendance&submenu=absence" },
    ]
  },
  {
    title: "Leave Management",
    icon: Calendar,
    href: "/?tab=leave",
    subItems: [
      { title: "Vacation Tracker", href: "/?tab=leave&submenu=vacation" },
      { title: "Sick Leave Analysis", href: "/?tab=leave&submenu=sick" },
      { title: "Leave Balance", href: "/?tab=leave&submenu=balance" },
    ]
  },
  {
    title: "Attrition",
    icon: UserMinus,
    href: "/?tab=attrition",
    subItems: [
      { title: "Turnover Rates", href: "/?tab=attrition&submenu=turnover" },
      { title: "Exit Interviews", href: "/?tab=attrition&submenu=exit" },
      { title: "Retention Strategies", href: "/?tab=attrition&submenu=retention" },
    ]
  },
  {
    title: "Compliance",
    icon: ClipboardList,
    href: "/?tab=compliance",
    subItems: [
      { title: "Form 15", href: "/?tab=compliance&submenu=form15" },
      { title: "Form IV", href: "/?tab=compliance&submenu=form4" },
      { title: "Regulatory Reports", href: "/?tab=compliance&submenu=regulatory" },
    ]
  },
  {
    title: "Overtime",
    icon: Clock,
    href: "/?tab=overtime",
    subItems: [
      { title: "Cost Analysis", href: "/?tab=overtime&submenu=cost" },
      { title: "Department Breakdown", href: "/?tab=overtime&submenu=department" },
      { title: "Individual Reports", href: "/?tab=overtime&submenu=individual" },
    ]
  },
  {
    title: "Report Builder",
    icon: FileBarChart,
    href: "/?tab=builder",
    subItems: [
      { title: "Custom Reports", href: "/?tab=builder&submenu=custom" },
      { title: "Saved Templates", href: "/?tab=builder&submenu=templates" },
      { title: "Scheduled Reports", href: "/?tab=builder&submenu=scheduled" },
    ]
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Check which tab is active from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("tab") || "dashboards";

  // Initialize expanded items based on active tab
  useEffect(() => {
    // Find the navigation item that matches the current URL's tab
    const matchingItem = navigation.find(item => {
      const itemTab = new URLSearchParams(new URL(item.href, window.location.origin).search).get("tab");
      return itemTab === activeTab;
    });
    
    if (matchingItem && !expandedItems.includes(matchingItem.title)) {
      setExpandedItems(prev => [...prev, matchingItem.title]);
    }
  }, [activeTab, location]);

  const toggleSubMenu = (title: string) => {
    setExpandedItems((current) => 
      current.includes(title) 
        ? current.filter(item => item !== title) 
        : [...current, title]
    );
  };

  // Handle navigation item click
  const handleNavItemClick = (item: any, e: React.MouseEvent) => {
    if (item.subItems) {
      e.preventDefault();
      toggleSubMenu(item.title);
    } else {
      if (window.innerWidth < 1024) {
        toggleSidebar();
      }
    }
  };

  // Handle submenu item click
  const handleSubItemClick = () => {
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
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
            <span className="text-lg font-semibold text-sidebar-foreground">HR Dashboard</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent"
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
                      onClick={(e) => handleNavItemClick(item, e)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        item.active || location.pathname === item.href || (item.href.includes("tab=") && item.href.includes(activeTab))
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
                            onClick={handleSubItemClick}
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/70",
                              location.search === new URL(subItem.href, window.location.origin).search && "bg-sidebar-accent/60 font-medium"
                            )}
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
                    onClick={(e) => handleNavItemClick(item, e)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      item.active || location.pathname === item.href
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
