
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronDown } from "lucide-react";

import HRReportBuilder from "@/components/hr/HRReportBuilder";
import EmployeeDashboards from "@/components/hr/EmployeeDashboards";
import AttendanceReports from "@/components/hr/AttendanceReports";
import LeaveReports from "@/components/hr/LeaveReports";
import AttritionReports from "@/components/hr/AttritionReports";
import ComplianceReports from "@/components/hr/ComplianceReports";
import OvertimeReports from "@/components/hr/OvertimeReports";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [activeTab, setActiveTab] = useState("dashboards");
  const [activeSubMenu, setActiveSubMenu] = useState({
    dashboards: "general",
    attendance: "general",
    leave: "general",
    attrition: "general",
    compliance: "general",
    overtime: "general",
    builder: "general",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-auto transition-all duration-300 ease-in-out p-4 md:p-6 lg:p-8 animate-fade-in">
          <div className="mx-auto max-w-7xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">HR Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Monitor employee metrics and create custom HR reports
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-7 mb-6">
                <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="leave">Leave</TabsTrigger>
                <TabsTrigger value="attrition">Attrition</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="overtime">Overtime</TabsTrigger>
                <TabsTrigger value="builder">Report Builder</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboards">
                <EmployeeDashboards subMenu={activeSubMenu.dashboards} />
              </TabsContent>
              
              <TabsContent value="attendance">
                <AttendanceReports subMenu={activeSubMenu.attendance} />
              </TabsContent>
              
              <TabsContent value="leave">
                <LeaveReports subMenu={activeSubMenu.leave} />
              </TabsContent>
              
              <TabsContent value="attrition">
                <AttritionReports subMenu={activeSubMenu.attrition} />
              </TabsContent>
              
              <TabsContent value="compliance">
                <ComplianceReports subMenu={activeSubMenu.compliance} />
              </TabsContent>
              
              <TabsContent value="overtime">
                <OvertimeReports subMenu={activeSubMenu.overtime} />
              </TabsContent>
              
              <TabsContent value="builder">
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
