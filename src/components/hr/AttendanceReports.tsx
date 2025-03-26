
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
import { attendanceData, employeeData, monthlySummaryData } from "@/utils/hrData";

const AttendanceReports = () => {
  const [reportType, setReportType] = useState("absenteeism");
  const [period, setPeriod] = useState("monthly");

  // Calculate consecutive absences (more than 3 days)
  const consecutiveAbsentees = [
    { id: 3, name: "Robert Johnson", department: "HR", position: "Specialist", consecutiveDays: 5, startDate: "2023-05-01", endDate: "2023-05-05" },
    { id: 8, name: "Lisa Martinez", department: "Customer Support", position: "Specialist", consecutiveDays: 4, startDate: "2023-05-03", endDate: "2023-05-06" },
  ];

  // Combine employee data with attendance for display
  const attendanceWithNames = attendanceData.map(record => {
    const employee = employeeData.find(emp => emp.id === record.employeeId);
    return {
      ...record,
      employeeName: employee ? employee.name : "Unknown",
      department: employee ? employee.department : "Unknown",
    };
  });

  // Calculate absenteeism rate by month
  const absenteeismData = monthlySummaryData.map(data => ({
    month: data.month,
    absentRate: data.absentRate,
  }));

  // Columns for data grid
  const attendanceColumns = [
    { key: "employeeId", title: "ID", sortable: true },
    { key: "employeeName", title: "Name", sortable: true },
    { key: "department", title: "Department", sortable: true },
    { key: "date", title: "Date", sortable: true },
    { key: "status", title: "Status", sortable: true },
    { key: "inTime", title: "In Time", sortable: true },
    { key: "outTime", title: "Out Time", sortable: true },
  ];

  const consecutiveColumns = [
    { key: "id", title: "ID", sortable: true },
    { key: "name", title: "Name", sortable: true },
    { key: "department", title: "Department", sortable: true },
    { key: "position", title: "Position", sortable: true },
    { key: "consecutiveDays", title: "Consecutive Days", sortable: true },
    { key: "startDate", title: "Start Date", sortable: true },
    { key: "endDate", title: "End Date", sortable: true },
  ];

  // Calculate late and early leaving trends
  const lateEarlyTrends = monthlySummaryData.map(data => ({
    month: data.month,
    late: Math.floor(Math.random() * 20) + 5,
    early: Math.floor(Math.random() * 15) + 3,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 items-center">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="absenteeism">Absenteeism Rate</SelectItem>
              <SelectItem value="consecutive">Consecutive Absentees</SelectItem>
              <SelectItem value="trend">Absenteeism Trend</SelectItem>
              <SelectItem value="lateearly">Late/Early Trends</SelectItem>
            </SelectContent>
          </Select>

          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
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
        <TabsContent value="absenteeism" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Absenteeism Rate - % vs Total Working Days</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={absenteeismData}
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
                  <Bar dataKey="absentRate" name="Absent Rate %" fill="#e74c3c" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="consecutive" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Consecutive Absentees Report (more than 3 days)</h3>
            <DataGrid data={consecutiveAbsentees} columns={consecutiveColumns} />
          </Card>
        </TabsContent>

        <TabsContent value="trend" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Absenteeism Trend Analysis (Monthly)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={absenteeismData}
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
                  <Line type="monotone" dataKey="absentRate" name="Absent Rate %" stroke="#e74c3c" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="lateearly" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Late/Early Leaving Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lateEarlyTrends}
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
                  <Line type="monotone" dataKey="late" name="Late Arrivals" stroke="#f39c12" strokeWidth={2} />
                  <Line type="monotone" dataKey="early" name="Early Leavings" stroke="#9b59b6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-5">
        <h3 className="text-xl font-medium mb-4">Attendance Records</h3>
        <DataGrid data={attendanceWithNames} columns={attendanceColumns} />
      </Card>
    </div>
  );
};

export default AttendanceReports;
