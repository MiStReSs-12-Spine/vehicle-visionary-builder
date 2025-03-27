
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { toast } from "sonner";

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
  
  // Display toast notification when tab changes
  useEffect(() => {
    const tabTitle = getPageTitle();
    toast.success(`${tabTitle} loaded`);
  }, [tabFromUrl]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-auto transition-all duration-300 ease-in-out p-4 md:p-6 lg:p-8 animate-fade-in">
          <div className="mx-auto max-w-7xl space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{getPageTitle()}</h1>
              <p className="text-muted-foreground mt-2">
                Monitor employee metrics and create custom HR reports
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
