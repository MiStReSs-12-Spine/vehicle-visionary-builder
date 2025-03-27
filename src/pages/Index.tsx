import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  
  const queryParams = new URLSearchParams(location.search);
  const tabFromUrl = queryParams.get("tab");
  const submenuFromUrl = queryParams.get("submenu");
  
  const [activeTab, setActiveTab] = useState(tabFromUrl || "dashboards");
  const [activeSubMenu, setActiveSubMenu] = useState({
    dashboards: submenuFromUrl || "general",
    attendance: submenuFromUrl || "general",
    leave: submenuFromUrl || "general",
    attrition: submenuFromUrl || "general",
    compliance: submenuFromUrl || "general",
    overtime: submenuFromUrl || "general",
    builder: submenuFromUrl || "general",
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams(location.search);
    params.set("tab", tab);
    
    if (submenuFromUrl) {
      params.set("submenu", submenuFromUrl);
    } else {
      params.delete("submenu");
    }
    
    navigate(`/?${params.toString()}`);
    toast.success(`${tab.charAt(0).toUpperCase() + tab.slice(1)} section loaded`);
  };

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
    
    if (submenuFromUrl) {
      setActiveSubMenu(prev => ({
        ...prev,
        [tabFromUrl || "dashboards"]: submenuFromUrl
      }));
    }
  }, [location.search, tabFromUrl, submenuFromUrl]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-auto transition-all duration-300 ease-in-out p-4 md:p-6 lg:p-8 animate-fade-in">
          <div className="mx-auto max-w-7xl space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">HR Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Monitor employee metrics and create custom HR reports
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <div className="overflow-x-auto pb-2">
                <TabsList className="grid grid-cols-4 md:grid-cols-7 w-max md:w-full mb-4">
                  <TabsTrigger value="dashboards" className="px-2 md:px-3">Dashboards</TabsTrigger>
                  <TabsTrigger value="attendance" className="px-2 md:px-3">Attendance</TabsTrigger>
                  <TabsTrigger value="leave" className="px-2 md:px-3">Leave</TabsTrigger>
                  <TabsTrigger value="attrition" className="px-2 md:px-3">Attrition</TabsTrigger>
                  <TabsTrigger value="compliance" className="px-2 md:px-3">Compliance</TabsTrigger>
                  <TabsTrigger value="overtime" className="px-2 md:px-3">Overtime</TabsTrigger>
                  <TabsTrigger value="builder" className="px-2 md:px-3">Report Builder</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="dashboards" className="mt-2">
                <EmployeeDashboards subMenu={activeSubMenu.dashboards} />
              </TabsContent>
              
              <TabsContent value="attendance" className="mt-2">
                <AttendanceReports subMenu={activeSubMenu.attendance} />
              </TabsContent>
              
              <TabsContent value="leave" className="mt-2">
                <LeaveReports subMenu={activeSubMenu.leave} />
              </TabsContent>
              
              <TabsContent value="attrition" className="mt-2">
                <AttritionReports subMenu={activeSubMenu.attrition} />
              </TabsContent>
              
              <TabsContent value="compliance" className="mt-2">
                <ComplianceReports subMenu={activeSubMenu.compliance} />
              </TabsContent>
              
              <TabsContent value="overtime" className="mt-2">
                <OvertimeReports subMenu={activeSubMenu.overtime} />
              </TabsContent>
              
              <TabsContent value="builder" className="mt-2">
                <HRReportBuilder subMenu={activeSubMenu.builder} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
