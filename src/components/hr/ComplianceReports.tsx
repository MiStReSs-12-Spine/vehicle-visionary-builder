import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, FileText, Info } from "lucide-react";
import DataGrid from "@/components/reports/DataGrid";
import { employeeData } from "@/utils/hrData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ComplianceReportsProps {
  subMenu: string;
}

const ComplianceReports: React.FC<ComplianceReportsProps> = ({ subMenu }) => {
  const [reportType, setReportType] = useState("form12");
  const [month, setMonth] = useState("may");
  const [year, setYear] = useState("2023");
  const [location, setLocation] = useState("all");
  const [department, setDepartment] = useState("all");

  // Generate sample compliance data
  const generateComplianceData = () => {
    return employeeData.map(emp => {
      const workHours = Math.floor(Math.random() * 40) + 160; // 160-200 hours
      const restHours = Math.floor(Math.random() * 20) + 60; // 60-80 hours
      const wages = Math.floor(Math.random() * 3000) + 2000; // $2000-$5000
      const overtimeHours = Math.floor(Math.random() * 20); // 0-20 hours
      const overtimePay = overtimeHours * 25; // $25 per hour
      const totalPay = wages + overtimePay;
      
      return {
        id: emp.id,
        name: emp.name,
        department: emp.department,
        position: emp.position,
        joiningDate: emp.joinDate,
        workHours,
        restHours,
        wages,
        overtimeHours,
        overtimePay,
        totalPay,
        location: ["Mumbai", "Bangalore", "Delhi", "Chennai"][Math.floor(Math.random() * 4)],
        grade: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
        designation: emp.position,
      };
    });
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
    { key: "location", title: "Location", sortable: true },
    { key: "grade", title: "Grade", sortable: true },
  ];

  const form25Columns = [
    { key: "id", title: "Employee ID", sortable: true },
    { key: "name", title: "Employee Name", sortable: true },
    { key: "department", title: "Department", sortable: true },
    { key: "position", title: "Designation", sortable: true },
    { key: "joiningDate", title: "Date of Joining", sortable: true },
    { key: "workHours", title: "Work Hours", sortable: true },
    { key: "location", title: "Location", sortable: true },
    { key: "grade", title: "Grade", sortable: true },
  ];

  const musterRollColumns = [
    { key: "id", title: "Employee ID", sortable: true },
    { key: "name", title: "Employee Name", sortable: true },
    { key: "department", title: "Department", sortable: true },
    { key: "workHours", title: "Work Hours", sortable: true },
    { key: "restHours", title: "Rest Hours", sortable: true },
    { key: "location", title: "Location", sortable: true },
  ];

  const wageRegisterColumns = [
    { key: "id", title: "Employee ID", sortable: true },
    { key: "name", title: "Employee Name", sortable: true },
    { key: "department", title: "Department", sortable: true },
    { key: "wages", title: "Basic Wages", sortable: true, 
      render: (value: number) => <span>${value}</span> },
    { key: "overtimeHours", title: "Overtime Hours", sortable: true },
    { key: "overtimePay", title: "Overtime Pay", sortable: true, 
      render: (value: number) => <span>${value}</span> },
    { key: "totalPay", title: "Total Pay", sortable: true, 
      render: (value: number) => <span>${value}</span> },
    { key: "location", title: "Location", sortable: true },
    { key: "grade", title: "Grade", sortable: true },
  ];

  const form15Columns = [
    { key: "id", title: "Employee ID", sortable: true },
    { key: "name", title: "Employee Name", sortable: true },
    { key: "department", title: "Department", sortable: true },
    { key: "position", title: "Designation", sortable: true },
    { key: "wages", title: "Basic Wages", sortable: true, 
      render: (value: number) => <span>${value}</span> },
    { key: "location", title: "Location", sortable: true },
  ];

  const formIVColumns = [
    { key: "id", title: "Employee ID", sortable: true },
    { key: "name", title: "Employee Name", sortable: true },
    { key: "department", title: "Department", sortable: true },
    { key: "position", title: "Designation", sortable: true },
    { key: "joiningDate", title: "Date of Joining", sortable: true },
    { key: "location", title: "Location", sortable: true },
    { key: "grade", title: "Grade", sortable: true },
  ];

  // Get columns based on report type
  const getColumns = () => {
    switch (reportType) {
      case "form12":
        return form12Columns;
      case "form25":
        return form25Columns;
      case "musterRoll":
        return musterRollColumns;
      case "wageRegister":
      case "formB":
        return wageRegisterColumns;
      case "form15":
        return form15Columns;
      case "formIV":
        return formIVColumns;
      default:
        return form12Columns;
    }
  };

  // Filter data based on location and department selections
  const filteredData = complianceData.filter(item => {
    const locationMatch = location === "all" || item.location === location;
    const departmentMatch = department === "all" || item.department === department;
    return locationMatch && departmentMatch;
  });

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
      case "form15":
        return "Form 15";
      case "formIV":
        return "Form IV";
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
              <SelectItem value="form15">Form 15</SelectItem>
              <SelectItem value="formIV">Form IV</SelectItem>
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

          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Chennai">Chennai</SelectItem>
            </SelectContent>
          </Select>

          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Customer Support">Customer Support</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export report as Excel/PDF</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Preview</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Preview printable report</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>This report provides compliance data required by labor laws. It can be filtered by month, year, location, and department.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Card className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-medium">{getTitle()}</h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Format Available</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Period: {month.charAt(0).toUpperCase() + month.slice(1)} {year} | 
            Location: {location === "all" ? "All Locations" : location} | 
            Department: {department === "all" ? "All Departments" : department}
          </p>
        </div>
        
        <div className="mb-4 text-sm text-muted-foreground">
          <p>To generate report add filters like: Payroll month, location, grade, designation, department</p>
        </div>
        
        <DataGrid data={filteredData} columns={getColumns()} />
      </Card>
    </div>
  );
};

export default ComplianceReports;
