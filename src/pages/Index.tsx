
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import HRReportBuilder from "@/components/hr/HRReportBuilder";
import EmployeeDashboards from "@/components/hr/EmployeeDashboards";
import AttendanceReports from "@/components/hr/AttendanceReports";
import LeaveReports from "@/components/hr/LeaveReports";
import AttritionReports from "@/components/hr/AttritionReports";
import ComplianceReports from "@/components/hr/ComplianceReports";
import OvertimeReports from "@/components/hr/OvertimeReports";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Initialize sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) { // xl breakpoint
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  // Parse tab and submenu from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const tabFromUrl = queryParams.get("tab") || "dashboards";
  const submenuFromUrl = queryParams.get("submenu") || "general";
  
  // Handle content display based on URL parameters
  const renderContent = () => {
    switch(tabFromUrl) {
      case "dashboards":
        return <EmployeeDashboards subMenu={submenuFromUrl} />;
      case "attendance":
        return <AttendanceReports subMenu={submenuFromUrl} />;
      case "leave":
        return <LeaveReports subMenu={submenuFromUrl} />;
      case "attrition":
        return <AttritionReports subMenu={submenuFromUrl} />;
      case "compliance":
        return <ComplianceReports subMenu={submenuFromUrl} />;
      case "overtime":
        return <OvertimeReports subMenu={submenuFromUrl} />;
      case "builder":
        return <HRReportBuilder subMenu={submenuFromUrl} />;
      default:
        return <EmployeeDashboards subMenu={submenuFromUrl} />;
    }
  };

  // Get appropriate title based on active tab
  const getPageTitle = () => {
    switch(tabFromUrl) {
      case "dashboards": return "Employee Overview";
      case "attendance": return "Attendance Reports";
      case "leave": return "Leave Management";
      case "attrition": return "Attrition Analytics";
      case "compliance": return "Compliance Reports";
      case "overtime": return "Overtime Analysis";
      case "builder": return "Custom Report Builder";
      default: return "HR Analytics Dashboard";
    }
  };
  
  // Get subtitle based on submenu
  const getPageSubtitle = () => {
    if (submenuFromUrl === "general") {
      return "Monitor employee metrics and create custom HR reports";
    }
    
    // Convert camelCase or dash-case to Title Case
    const formatSubmenu = (str: string) => {
      return str
        .replace(/-/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
    };
    
    return `${formatSubmenu(submenuFromUrl)} - ${getPageTitle()}`;
  };
  
  // Display toast notification when tab/submenu changes
  useEffect(() => {
    const tabTitle = getPageTitle();
    const subTitle = submenuFromUrl !== "general" ? ` - ${submenuFromUrl.replace(/-/g, ' ')}` : '';
    toast.success(`${tabTitle}${subTitle} loaded`);
  }, [tabFromUrl, submenuFromUrl]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={cn(
          "flex-1 overflow-auto transition-all duration-300 ease-in-out p-4 md:p-6 lg:p-8 animate-fade-in",
          sidebarOpen ? "xl:ml-64" : ""
        )}>
          <div className="mx-auto max-w-7xl space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{getPageTitle()}</h1>
              <p className="text-muted-foreground mt-2">
                {getPageSubtitle()}
              </p>
            </div>

            <div className="mt-6">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
