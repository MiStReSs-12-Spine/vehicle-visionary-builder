import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import DataGrid from "@/components/reports/DataGrid";
import { overtimeData, employeeData, monthlySummaryData } from "@/utils/hrData";

interface OvertimeReportsProps {
  subMenu: string;
}

const OvertimeReports: React.FC<OvertimeReportsProps> = ({ subMenu }) => {
  const [reportType, setReportType] = useState("cost");
  const [period, setPeriod] = useState("monthly");

  // Combine employee data with overtime data for display
  const overtimeWithNames = overtimeData.map(record => {
    const employee = employeeData.find(emp => emp.id === record.employeeId);
    return {
      ...record,
      employeeName: employee ? employee.name : "Unknown",
      department: employee ? employee.department : "Unknown",
    };
  });

  // Calculate overtime cost by month
  const overtimeCostData = monthlySummaryData.map(data => ({
    month: data.month,
    overtimeCost: data.overtimeCost,
  }));

  // Department-wise overtime
  const departmentOvertime = [
    { department: "Engineering", hours: 120 },
    { department: "Marketing", hours: 95 },
    { department: "HR", hours: 60 },
    { department: "Finance", hours: 80 },
    { department: "Operations", hours: 110 },
    { department: "Sales", hours: 130 },
    { department: "Customer Support", hours: 145 },
    { department: "IT", hours: 75 },
    { department: "Product", hours: 100 },
  ];

  // Individual overtime reports
  const individualOvertime = employeeData.map(emp => ({
    name: emp.name,
    hours: Math.floor(Math.random() * 30) + 5,
  }));

  // Columns for data grid
  const overtimeColumns = [
    { key: "employeeId", title: "ID", sortable: true },
    { key: "employeeName", title: "Employee", sortable: true },
    { key: "department", title: "Department", sortable: true },
    { key: "date", title: "Date", sortable: true },
    { key: "hours", title: "Overtime Hours", sortable: true },
    { key: "rate", title: "Overtime Rate", sortable: true },
    { key: "pay", title: "Overtime Pay", sortable: true },
    { key: "approvedBy", title: "Approved By", sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 items-center">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cost">Cost Analysis</SelectItem>
              <SelectItem value="department">Department Breakdown</SelectItem>
              <SelectItem value="individual">Individual Reports</SelectItem>
            </SelectContent>
          </Select>

          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          <span>Select Date Range</span>
        </Button>
      </div>

      <Tabs value={reportType} onValueChange={setReportType}>
        <TabsContent value="cost" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Overtime Cost Analysis</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={overtimeCostData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid #f0f0f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="overtimeCost" name="Overtime Cost" stroke="#f39c12" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="department" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Overtime by Department</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentOvertime}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" angle={-45} textAnchor="end" height={70} />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid #f0f0f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="hours" name="Overtime Hours" fill="#3498db" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="individual" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Individual Overtime Reports</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={individualOvertime}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid #f0f0f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="hours" name="Overtime Hours" fill="#2ecc71" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-5">
        <h3 className="text-xl font-medium mb-4">Overtime Records</h3>
        <DataGrid data={overtimeWithNames} columns={overtimeColumns} />
      </Card>
    </div>
  );
};

export default OvertimeReports;
