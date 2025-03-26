
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronDown } from "lucide-react";

import HRReportBuilder from "@/components/hr/HRReportBuilder";
import EmployeeDashboards from "@/components/hr/EmployeeDashboards";
import AttendanceReports from "@/components/hr/AttendanceReports";
import LeaveReports from "@/components/hr/LeaveReports";
import AttritionReports from "@/components/hr/AttritionReports";
import ComplianceReports from "@/components/hr/ComplianceReports";
import OvertimeReports from "@/components/hr/OvertimeReports";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HRDashboard = () => {
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

  // Submenu options for each tab
  const subMenuOptions = {
    dashboards: ["General", "Employee Overview", "Department Stats", "Performance Metrics"],
    attendance: ["General", "Daily Report", "Monthly Summary", "Absence Patterns"],
    leave: ["General", "Vacation Tracker", "Sick Leave Analysis", "Leave Balance"],
    attrition: ["General", "Turnover Rates", "Exit Interviews", "Retention Strategies"],
    compliance: ["General", "Form 15", "Form IV", "Regulatory Reports"],
    overtime: ["General", "Cost Analysis", "Department Breakdown", "Individual Reports"],
    builder: ["General", "Custom Reports", "Saved Templates", "Scheduled Reports"],
  };

  const handleSubMenuChange = (tab: string, option: string) => {
    setActiveSubMenu({
      ...activeSubMenu,
      [tab]: option.toLowerCase(),
    });
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">HR Analytics & Reports</h1>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-7 mb-6">
          {Object.keys(subMenuOptions).map((tab) => (
            <DropdownMenu key={tab}>
              <DropdownMenuTrigger asChild>
                <TabsTrigger value={tab} className="flex items-center justify-center gap-1">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  <ChevronDown className="h-3 w-3" />
                </TabsTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {subMenuOptions[tab as keyof typeof subMenuOptions].map((option) => (
                  <DropdownMenuItem 
                    key={option}
                    onClick={() => handleSubMenuChange(tab, option)}
                    className={activeSubMenu[tab as keyof typeof activeSubMenu] === option.toLowerCase() ? "bg-accent" : ""}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </TabsList>

        <TabsContent value="dashboards">
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">
              {activeSubMenu.dashboards.charAt(0).toUpperCase() + activeSubMenu.dashboards.slice(1)} Dashboard
            </h2>
          </div>
          <EmployeeDashboards subMenu={activeSubMenu.dashboards} />
        </TabsContent>
        
        <TabsContent value="attendance">
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">
              {activeSubMenu.attendance.charAt(0).toUpperCase() + activeSubMenu.attendance.slice(1)} Attendance Report
            </h2>
          </div>
          <AttendanceReports subMenu={activeSubMenu.attendance} />
        </TabsContent>
        
        <TabsContent value="leave">
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">
              {activeSubMenu.leave.charAt(0).toUpperCase() + activeSubMenu.leave.slice(1)} Leave Report
            </h2>
          </div>
          <LeaveReports subMenu={activeSubMenu.leave} />
        </TabsContent>
        
        <TabsContent value="attrition">
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">
              {activeSubMenu.attrition.charAt(0).toUpperCase() + activeSubMenu.attrition.slice(1)} Attrition Report
            </h2>
          </div>
          <AttritionReports subMenu={activeSubMenu.attrition} />
        </TabsContent>
        
        <TabsContent value="compliance">
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">
              {activeSubMenu.compliance.charAt(0).toUpperCase() + activeSubMenu.compliance.slice(1)} Compliance Report
            </h2>
          </div>
          <ComplianceReports subMenu={activeSubMenu.compliance} />
        </TabsContent>
        
        <TabsContent value="overtime">
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">
              {activeSubMenu.overtime.charAt(0).toUpperCase() + activeSubMenu.overtime.slice(1)} Overtime Report
            </h2>
          </div>
          <OvertimeReports subMenu={activeSubMenu.overtime} />
        </TabsContent>
        
        <TabsContent value="builder">
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">
              {activeSubMenu.builder.charAt(0).toUpperCase() + activeSubMenu.builder.slice(1)} Report Builder
            </h2>
          </div>
          <HRReportBuilder subMenu={activeSubMenu.builder} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRDashboard;
