
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
import { exitData, employeeData, monthlySummaryData } from "@/utils/hrData";

interface AttritionReportsProps {
  subMenu: string;
}

const AttritionReports: React.FC<AttritionReportsProps> = ({ subMenu }) => {
  const [reportType, setReportType] = useState("rate");
  const [period, setPeriod] = useState("monthly");

  // Combine employee data with exit data for display
  const exitWithNames = exitData.map(record => {
    // We're using fake data for exited employees (IDs 9 and above)
    return {
      ...record,
      employeeName: `Employee ${record.employeeId}`,
      department: record.employeeId % 3 === 0 ? "Engineering" : 
                 record.employeeId % 3 === 1 ? "Marketing" : "HR",
    };
  });

  // Calculate attrition rate by month
  const attritionData = monthlySummaryData.map(data => ({
    month: data.month,
    rate: data.attritionRate,
  }));

  // Employee movement data
  const movementData = monthlySummaryData.map(data => ({
    month: data.month,
    newHires: data.newHires,
    exits: data.exits,
  }));

  // Exit type breakdown
  const exitTypeData = [
    { name: "Resignation", value: 65 },
    { name: "Termination", value: 20 },
    { name: "Retirement", value: 15 },
  ];

  // Department-wise attrition
  const departmentAttrition = [
    { department: "Engineering", rate: 4.5 },
    { department: "Marketing", rate: 6.2 },
    { department: "HR", rate: 3.1 },
    { department: "Finance", rate: 2.8 },
    { department: "Operations", rate: 5.3 },
    { department: "Sales", rate: 7.5 },
    { department: "Customer Support", rate: 8.2 },
    { department: "IT", rate: 3.9 },
    { department: "Product", rate: 4.2 },
  ];

  const COLORS = ["#3498db", "#e74c3c", "#f39c12"];

  // Columns for data grid
  const exitColumns = [
    { key: "employeeId", title: "ID", sortable: true },
    { key: "employeeName", title: "Employee", sortable: true },
    { key: "department", title: "Department", sortable: true },
    { key: "exitDate", title: "Exit Date", sortable: true },
    { key: "reason", title: "Reason", sortable: true },
    { key: "type", title: "Type", sortable: true },
    { key: "noticePeriod", title: "Notice Period (Days)", sortable: true },
    { key: "compliant", title: "Compliant", sortable: true },
    { key: "feedback", title: "Feedback", sortable: true },
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
              <SelectItem value="rate">Attrition Rate</SelectItem>
              <SelectItem value="movement">Employee Movement</SelectItem>
              <SelectItem value="breakdown">Exit Breakdown</SelectItem>
              <SelectItem value="department">Department-wise</SelectItem>
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
      </div>

      <Tabs value={reportType} onValueChange={setReportType}>
        <TabsContent value="rate" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Attrition Rate and Trend Analysis</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={attritionData}
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
                  <Line type="monotone" dataKey="rate" name="Attrition Rate %" stroke="#e74c3c" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="movement" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Employee Movement: New Hires & Exits</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={movementData}
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
                  <Bar dataKey="newHires" name="New Hires" fill="#2ecc71" />
                  <Bar dataKey="exits" name="Exits" fill="#e74c3c" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Exit Breakdown: Resignations, Terminations, Retirements</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={exitTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {exitTypeData.map((entry, index) => (
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

        <TabsContent value="department" className="mt-0">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Attrition by Department</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentAttrition}
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
                  <Bar dataKey="rate" name="Attrition Rate %" fill="#e74c3c" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-5">
        <h3 className="text-xl font-medium mb-4">Exit Records</h3>
        <DataGrid data={exitWithNames} columns={exitColumns} />
      </Card>
    </div>
  );
};

export default AttritionReports;
