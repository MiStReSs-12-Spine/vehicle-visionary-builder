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
import DataGrid from "@/components/reports/DataGrid";
import { leaveData, employeeData } from "@/utils/hrData";

interface LeaveReportsProps {
  subMenu: string;
}

const LeaveReports: React.FC<LeaveReportsProps> = ({ subMenu }) => {
  const [reportType, setReportType] = useState("balance");

  // Combine employee data with leave for display
  const leaveWithNames = leaveData.map(record => {
    const employee = employeeData.find(emp => emp.id === record.employeeId);
    return {
      ...record,
      employeeName: employee ? employee.name : "Unknown",
      department: employee ? employee.department : "Unknown",
    };
  });

  // Calculate leave balance for each employee
  const leaveBalance = employeeData.map(emp => {
    // Simulate leave balance data
    return {
      id: emp.id,
      name: emp.name,
      annual: Math.floor(Math.random() * 10) + 5,
      sick: Math.floor(Math.random() * 5) + 2,
      personal: Math.floor(Math.random() * 3) + 1,
      total: Math.floor(Math.random() * 15) + 8,
      department: emp.department,
    };
  });

  // Calculate approval and rejection data
  const approvalData = [
    { month: "Jan", approved: 12, rejected: 3 },
    { month: "Feb", approved: 15, rejected: 2 },
    { month: "Mar", approved: 10, rejected: 4 },
    { month: "Apr", approved: 8, rejected: 1 },
    { month: "May", approved: 14, rejected: 2 },
    { month: "Jun", approved: 16, rejected: 0 },
    { month: "Jul", approved: 18, rejected: 3 },
    { month: "Aug", approved: 11, rejected: 1 },
    { month: "Sep", approved: 13, rejected: 2 },
    { month: "Oct", approved: 9, rejected: 3 },
    { month: "Nov", approved: 7, rejected: 1 },
    { month: "Dec", approved: 10, rejected: 2 },
  ];

  // Calculate leave type data for pie chart
  const leaveTypeData = [
    { name: "Annual", value: 45 },
    { name: "Sick", value: 25 },
    { name: "Personal", value: 15 },
    { name: "Other", value: 5 },
  ];

  const COLORS = ["#3498db", "#2ecc71", "#e74c3c", "#f39c12"];

  // Columns for data grid
  const leaveColumns = [
    { key: "id", title: "ID", sortable: true },
    { key: "employeeName", title: "Employee", sortable: true },
    { key: "department", title: "Department", sortable: true },
    { key: "type", title: "Leave Type", sortable: true },
    { key: "startDate", title: "Start Date", sortable: true },
    { key: "endDate", title: "End Date", sortable: true },
    { key: "duration", title: "Duration (Days)", sortable: true },
    { key: "status", title: "Status", sortable: true },
    { key: "approvedBy", title: "Approved By", sortable: true },
  ];

  const balanceColumns = [
    { key: "id", title: "ID", sortable: true },
    { key: "name", title: "Employee", sortable: true },
    { key: "department", title: "Department", sortable: true },
    { key: "annual", title: "Annual Leave", sortable: true },
    { key: "sick", title: "Sick Leave", sortable: true },
    { key: "personal", title: "Personal Leave", sortable: true },
    { key: "total", title: "Total Balance", sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="balance">Leave Balance</SelectItem>
            <SelectItem value="approval">Approval Trends</SelectItem>
            <SelectItem value="types">Leave Types</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={reportType} onValueChange={setReportType}>
        <TabsContent value="balance" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Leave Balance Report</h3>
            <DataGrid data={leaveBalance} columns={balanceColumns} />
          </Card>
        </TabsContent>

        <TabsContent value="approval" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Leave Approval & Rejection Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={approvalData}
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
                  <Bar dataKey="approved" name="Approved" fill="#2ecc71" />
                  <Bar dataKey="rejected" name="Rejected" fill="#e74c3c" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Leave Types Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leaveTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {leaveTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid #f0f0f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-5">
        <h3 className="text-xl font-medium mb-4">Recent Leave Records</h3>
        <DataGrid data={leaveWithNames} columns={leaveColumns} />
      </Card>
    </div>
  );
};

export default LeaveReports;
