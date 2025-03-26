
import React from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
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
import { departmentData, levelData, shiftData } from "@/utils/hrData";

const COLORS = ["#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#9b59b6", "#1abc9c", "#34495e", "#d35400"];

const EmployeeDashboards = () => {
  // Calculate total headcount
  const totalHeadcount = departmentData.reduce((sum, dept) => sum + dept.headcount, 0);
  const maleCount = departmentData.reduce((sum, dept) => sum + dept.maleCount, 0);
  const femaleCount = departmentData.reduce((sum, dept) => sum + dept.femaleCount, 0);

  // Prepare gender data for pie chart
  const genderData = [
    { name: "Male", value: maleCount },
    { name: "Female", value: femaleCount },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-5">
          <h3 className="text-lg font-medium mb-1">Total Headcount</h3>
          <p className="text-3xl font-bold">{totalHeadcount}</p>
          <p className="text-sm text-muted-foreground mt-1">Across all departments</p>
        </Card>
        
        <Card className="p-5">
          <h3 className="text-lg font-medium mb-1">Departments</h3>
          <p className="text-3xl font-bold">{departmentData.length}</p>
          <p className="text-sm text-muted-foreground mt-1">Active departments</p>
        </Card>
        
        <Card className="p-5">
          <h3 className="text-lg font-medium mb-1">Male Employees</h3>
          <p className="text-3xl font-bold">{maleCount}</p>
          <p className="text-sm text-muted-foreground mt-1">{((maleCount / totalHeadcount) * 100).toFixed(1)}% of workforce</p>
        </Card>
        
        <Card className="p-5">
          <h3 className="text-lg font-medium mb-1">Female Employees</h3>
          <p className="text-3xl font-bold">{femaleCount}</p>
          <p className="text-sm text-muted-foreground mt-1">{((femaleCount / totalHeadcount) * 100).toFixed(1)}% of workforce</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department-wise Dashboard */}
        <Card className="p-5">
          <h3 className="text-xl font-medium mb-4">Department-wise Dashboard</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="headcount" name="Total" fill="#3498db" />
                <Bar dataKey="maleCount" name="Male" fill="#2ecc71" />
                <Bar dataKey="femaleCount" name="Female" fill="#e74c3c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Gender Dashboard */}
        <Card className="p-5">
          <h3 className="text-xl font-medium mb-4">Gender Dashboard</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {genderData.map((entry, index) => (
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Level-wise Dashboard */}
        <Card className="p-5">
          <h3 className="text-xl font-medium mb-4">Level-wise Dashboard</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={levelData}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
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
                <Bar dataKey="count" name="Total" fill="#3498db" />
                <Bar dataKey="maleCount" name="Male" fill="#2ecc71" />
                <Bar dataKey="femaleCount" name="Female" fill="#e74c3c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Shift-wise Dashboard */}
        <Card className="p-5">
          <h3 className="text-xl font-medium mb-4">Shift-wise Dashboard</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={shiftData}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
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
                <Bar dataKey="count" name="Total" fill="#3498db" />
                <Bar dataKey="maleCount" name="Male" fill="#2ecc71" />
                <Bar dataKey="femaleCount" name="Female" fill="#e74c3c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboards;
