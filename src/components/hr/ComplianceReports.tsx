
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import DataGrid from "@/components/reports/DataGrid";
import { employeeData } from "@/utils/hrData";

const ComplianceReports = () => {
  const [reportType, setReportType] = useState("form12");
  const [month, setMonth] = useState("may");
  const [year, setYear] = useState("2023");

  // Generate sample compliance data
  const generateComplianceData = () => {
    return employeeData.map(emp => ({
      id: emp.id,
      name: emp.name,
      department: emp.department,
      position: emp.position,
      joiningDate: emp.joinDate,
      workHours: Math.floor(Math.random() * 40) + 160, // 160-200 hours
      restHours: Math.floor(Math.random() * 20) + 60, // 60-80 hours
      wages: Math.floor(Math.random() * 3000) + 2000, // $2000-$5000
      overtimeHours: Math.floor(Math.random() * 20), // 0-20 hours
      overtimePay: function() { return this.overtimeHours * 25; }, // $25 per hour
      totalPay: function() { return this.wages + this.overtimePay(); }
    }));
  };

  const complianceData = generateComplianceData();

  // Columns for different report types
  const form12Columns = [
    { key: "id", title: "Employee ID", sortable: true },
    { key: "name", title: "Employee Name", sortable: true },
    { key: "department", title: "Department", sortable: true },
    { key: "position", title: "Designation", sortable: true },
    { key: "joiningDate", title: "Date of Joining", sortable: true },
    { key: "workHours", title: "Work Hours", sortable: true },
    { key: "restHours", title: "Rest Hours", sortable: true },
  ];

  const musterRollColumns = [
    { key: "id", title: "Employee ID", sortable: true },
    { key: "name", title: "Employee Name", sortable: true },
    { key: "department", title: "Department", sortable: true },
    { key: "workHours", title: "Work Hours", sortable: true },
    { key: "restHours", title: "Rest Hours", sortable: true },
  ];

  const wageRegisterColumns = [
    { key: "id", title: "Employee ID", sortable: true },
    { key: "name", title: "Employee Name", sortable: true },
    { key: "department", title: "Department", sortable: true },
    { key: "wages", title: "Basic Wages", sortable: true, 
      render: (value: number) => <span>${value}</span> },
    { key: "overtimeHours", title: "Overtime Hours", sortable: true },
    { key: "overtimePay", title: "Overtime Pay", sortable: true, 
      render: (value: Function) => <span>${value()}</span> },
    { key: "totalPay", title: "Total Pay", sortable: true, 
      render: (value: Function) => <span>${value()}</span> },
  ];

  // Get columns based on report type
  const getColumns = () => {
    switch (reportType) {
      case "form12":
      case "form25":
        return form12Columns;
      case "musterRoll":
        return musterRollColumns;
      case "wageRegister":
      case "formB":
        return wageRegisterColumns;
      default:
        return form12Columns;
    }
  };

  // Get title based on report type
  const getTitle = () => {
    switch (reportType) {
      case "form12":
        return "Form 12";
      case "form25":
        return "Form 25";
      case "musterRoll":
        return "Muster Roll - Rest Hours / Work Hours";
      case "wageRegister":
        return "Wage Register";
      case "formB":
        return "Form B";
      default:
        return "Compliance Report";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="form12">Form 12</SelectItem>
              <SelectItem value="form25">Form 25</SelectItem>
              <SelectItem value="musterRoll">Muster Roll</SelectItem>
              <SelectItem value="wageRegister">Wage Register</SelectItem>
              <SelectItem value="formB">Form B</SelectItem>
            </SelectContent>
          </Select>

          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="january">January</SelectItem>
              <SelectItem value="february">February</SelectItem>
              <SelectItem value="march">March</SelectItem>
              <SelectItem value="april">April</SelectItem>
              <SelectItem value="may">May</SelectItem>
              <SelectItem value="june">June</SelectItem>
              <SelectItem value="july">July</SelectItem>
              <SelectItem value="august">August</SelectItem>
              <SelectItem value="september">September</SelectItem>
              <SelectItem value="october">October</SelectItem>
              <SelectItem value="november">November</SelectItem>
              <SelectItem value="december">December</SelectItem>
            </SelectContent>
          </Select>

          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            <span>Preview</span>
          </Button>
        </div>
      </div>

      <Card className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium">{getTitle()}</h3>
          <p className="text-sm text-muted-foreground">Period: {month.charAt(0).toUpperCase() + month.slice(1)} {year}</p>
        </div>
        <DataGrid data={complianceData} columns={getColumns()} />
      </Card>
    </div>
  );
};

export default ComplianceReports;
