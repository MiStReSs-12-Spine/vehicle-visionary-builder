
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";

import HRReportBuilder from "@/components/hr/HRReportBuilder";
import EmployeeDashboards from "@/components/hr/EmployeeDashboards";
import AttendanceReports from "@/components/hr/AttendanceReports";
import LeaveReports from "@/components/hr/LeaveReports";
import AttritionReports from "@/components/hr/AttritionReports";
import ComplianceReports from "@/components/hr/ComplianceReports";
import OvertimeReports from "@/components/hr/OvertimeReports";

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboards");

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
          <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger>
          <TabsTrigger value="attrition">Attrition</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="overtime">Overtime</TabsTrigger>
          <TabsTrigger value="builder">Report Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboards">
          <EmployeeDashboards />
        </TabsContent>
        
        <TabsContent value="attendance">
          <AttendanceReports />
        </TabsContent>
        
        <TabsContent value="leave">
          <LeaveReports />
        </TabsContent>
        
        <TabsContent value="attrition">
          <AttritionReports />
        </TabsContent>
        
        <TabsContent value="compliance">
          <ComplianceReports />
        </TabsContent>
        
        <TabsContent value="overtime">
          <OvertimeReports />
        </TabsContent>
        
        <TabsContent value="builder">
          <HRReportBuilder />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRDashboard;
