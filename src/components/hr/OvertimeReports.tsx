
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Filter } from "lucide-react";
import DataGrid from "@/components/reports/DataGrid";
import { overtimeData, employeeData, departmentData, monthlySummaryData } from "@/utils/hrData";

const OvertimeReports = () => {
  const [reportType, setReportType] = useState("individual");
  const [period, setPeriod] = useState("monthly");
  const [viewBy, setViewBy] = useState("department");

  // Combine employee data with overtime for display
  const overtimeWithNames = overtimeData.map(record => {
    const employee = employeeData.find(emp => emp.id === record.employeeId);
    return {
      ...record,
      employeeName: employee ? employee.name : "Unknown",
      department: employee ? employee.department : "Unknown",
      position: employee ? employee.position : "Unknown",
      cost: record.hours * 25, // $25 per hour
    };
  });

  // Overtime by department data
  const departmentOvertime = departmentData.map(dept => ({
    department: dept.name,
    hours: Math.floor(Math.random() * 100) + 50, // 50-150 hours
    cost: function() { return this.hours * 25; }, // $25 per hour
  }));

  // Monthly overtime data
  const monthlyOvertime = monthlySummaryData.map(data => ({
    month: data.month,
    hours: data.overtimeHours,
    approved: Math.floor(data.overtimeHours * 0.85), // 85% approval rate
    unapproved: function() { return this.hours - this.approved; }
  }));

  // Columns for data grid
  const individualColumns = [
    { key: "employeeId", title: "ID", sortable: true },
    { key: "employeeName", title: "Employee", sortable: true },
    { key: "department", title: "Department", sortable: true },
    { key: "position", title: "Position", sortable: true },
    { key: "date", title: "Date", sortable: true },
    { key: "hours", title: "Hours", sortable: true },
    { key: "cost", title: "Cost", sortable: true,
      render: (value: number) => <span>${value}</span> },
    { key: "approved", title: "Approved", sortable: true,
      render: (value: boolean) => <span>{value ? "Yes" : "No"}</span> },
    { key: "approvedBy", title: "Approved By", sortable: true },
  ];

  const departmentColumns = [
    { key: "department", title: "Department", sortable: true },
    { key: "hours", title: "Total Hours", sortable: true },
    { key: "cost", title: "Total Cost", sortable: true,
      render: (value: Function) => <span>${value()}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual Employee</SelectItem>
              <SelectItem value="monthly">Monthly Summary</SelectItem>
              <SelectItem value="approval">Approved vs Unapproved</SelectItem>
              <SelectItem value="trend">Overtime Trend</SelectItem>
              <SelectItem value="excessive">Excessive Overtime</SelectItem>
            </SelectContent>
          </Select>

          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <Select value={viewBy} onValueChange={setViewBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="View by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="department">Department</SelectItem>
              <SelectItem value="designation">Designation</SelectItem>
              <SelectItem value="hod">HOD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      <Tabs value={reportType} onValueChange={setReportType}>
        <TabsContent value="individual" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Individual Employee-wise Overtime Report</h3>
            <DataGrid data={overtimeWithNames} columns={individualColumns} />
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Month-wise Overtime Report ({viewBy})</h3>
            <DataGrid data={departmentOvertime} columns={departmentColumns} />
          </Card>
        </TabsContent>

        <TabsContent value="approval" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Approved vs. Unapproved Overtime</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyOvertime}
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
                  <Bar dataKey="approved" name="Approved Hours" fill="#2ecc71" />
                  <Bar dataKey="unapproved" name="Unapproved Hours" fill="#e74c3c" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="trend" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Overtime Trend Report (Monthly)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyOvertime}
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
                  <Line type="monotone" dataKey="hours" name="Total Overtime Hours" stroke="#3498db" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="excessive" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Excessive Overtime Report</h3>
            <p className="text-sm text-muted-foreground mb-4">Showing employees with more than 20 hours of overtime in the selected period</p>
            <DataGrid 
              data={overtimeWithNames.filter(item => item.hours > 20)} 
              columns={individualColumns} 
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OvertimeReports;
