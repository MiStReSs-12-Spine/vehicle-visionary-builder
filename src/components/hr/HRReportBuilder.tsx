
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Card from "@/components/common/Card";
import QueryBuilder from "@/components/reports/QueryBuilder";
import ChartVisualizer from "@/components/reports/ChartVisualizer";
import DataGrid from "@/components/reports/DataGrid";
import { 
  employeeData,
  departmentData,
  attendanceData,
  leaveData,
  exitData,
  overtimeData
} from "@/utils/hrData";
import { toast } from "sonner";

// Sample fields for the HR query builder
const queryFields = [
  { name: "Employee ID", type: "string" as const },
  { name: "Employee Name", type: "string" as const },
  { name: "Department", type: "string" as const },
  { name: "Position", type: "string" as const },
  { name: "Level", type: "string" as const },
  { name: "Shift", type: "string" as const },
  { name: "Gender", type: "string" as const },
  { name: "Join Date", type: "date" as const },
  { name: "Status", type: "string" as const },
  { name: "Attendance Status", type: "string" as const },
  { name: "Leave Type", type: "string" as const },
  { name: "Overtime Hours", type: "number" as const },
  { name: "Absent Days", type: "number" as const },
];

// Sample columns for the employee data grid
const employeeColumns = [
  { key: "id", title: "ID", sortable: true },
  { key: "name", title: "Name", sortable: true },
  { key: "gender", title: "Gender", sortable: true },
  { key: "department", title: "Department", sortable: true },
  { key: "position", title: "Position", sortable: true },
  { key: "level", title: "Level", sortable: true },
  { key: "shift", title: "Shift", sortable: true },
  { key: "joinDate", title: "Join Date", sortable: true },
  { key: "status", title: "Status", sortable: true },
];

const HRReportBuilder = () => {
  const [reportName, setReportName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTab, setSelectedTab] = useState("query");
  const [currentDataset, setCurrentDataset] = useState("employees");

  // Handle query execution
  const handleRunQuery = () => {
    toast.success("Query executed successfully!");
    setSelectedTab("results");
  };

  // Handle saving the report
  const handleSaveReport = () => {
    if (!reportName) {
      toast.error("Please enter a report name");
      return;
    }
    
    toast.success(`Report "${reportName}" saved successfully!`);
  };

  // Get the appropriate data and columns based on selected dataset
  const getDatasetConfig = () => {
    switch (currentDataset) {
      case "employees":
        return { 
          data: employeeData, 
          columns: employeeColumns,
          title: "Employee Data",
          xKey: "department",
          yKeys: [
            { key: "count", name: "Employee Count", color: "#3498db" },
          ]
        };
      case "departments":
        return { 
          data: departmentData, 
          columns: [
            { key: "name", title: "Department", sortable: true },
            { key: "headcount", title: "Headcount", sortable: true },
            { key: "maleCount", title: "Male", sortable: true },
            { key: "femaleCount", title: "Female", sortable: true },
          ],
          title: "Department Data",
          xKey: "name",
          yKeys: [
            { key: "headcount", name: "Headcount", color: "#3498db" },
            { key: "maleCount", name: "Male", color: "#2ecc71" },
            { key: "femaleCount", name: "Female", color: "#e74c3c" },
          ]
        };
      case "attendance":
        return { 
          data: attendanceData.slice(0, 5), 
          columns: [
            { key: "employeeId", title: "Employee ID", sortable: true },
            { key: "date", title: "Date", sortable: true },
            { key: "status", title: "Status", sortable: true },
            { key: "inTime", title: "In Time", sortable: true },
            { key: "outTime", title: "Out Time", sortable: true },
            { key: "late", title: "Late", sortable: true },
            { key: "earlyLeaving", title: "Early Leaving", sortable: true },
          ],
          title: "Attendance Data",
          xKey: "employeeId",
          yKeys: [
            { key: "status", name: "Status", color: "#3498db" },
          ]
        };
      default:
        return { 
          data: employeeData, 
          columns: employeeColumns,
          title: "Employee Data",
          xKey: "department",
          yKeys: [
            { key: "count", name: "Employee Count", color: "#3498db" },
          ]
        };
    }
  };

  const { data, columns, title, xKey, yKeys } = getDatasetConfig();

  return (
    <div className="space-y-6">
      <Card className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="report-name">Report Name</Label>
            <Input
              id="report-name"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              placeholder="Enter report name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="report-description">Description (Optional)</Label>
            <Input
              id="report-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex gap-3 flex-wrap">
            <Button
              variant={currentDataset === "employees" ? "default" : "outline"}
              onClick={() => setCurrentDataset("employees")}
            >
              Employees
            </Button>
            <Button
              variant={currentDataset === "departments" ? "default" : "outline"}
              onClick={() => setCurrentDataset("departments")}
            >
              Departments
            </Button>
            <Button
              variant={currentDataset === "attendance" ? "default" : "outline"}
              onClick={() => setCurrentDataset("attendance")}
            >
              Attendance
            </Button>
            <Button
              variant={currentDataset === "leave" ? "default" : "outline"}
              onClick={() => setCurrentDataset("leave")}
            >
              Leave
            </Button>
            <Button
              variant={currentDataset === "overtime" ? "default" : "outline"}
              onClick={() => setCurrentDataset("overtime")}
            >
              Overtime
            </Button>
          </div>
          <Button onClick={handleSaveReport}>Save Report</Button>
        </div>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="query">Query Builder</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        <TabsContent value="query" className="mt-6">
          <QueryBuilder 
            fields={queryFields} 
            onRunQuery={handleRunQuery}
            onSaveQuery={() => toast.success("Query saved!")}
          />
        </TabsContent>
        <TabsContent value="results" className="mt-6 space-y-6">
          <ChartVisualizer
            title={title}
            data={data}
            xKey={xKey}
            yKeys={yKeys}
            description="Interactive visualization of the HR query results."
          />
          <DataGrid data={data} columns={columns} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRReportBuilder;
