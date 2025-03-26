
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  AreaChart as AreaChartIcon,
  Download,
  Share2,
} from "lucide-react";

interface ChartVisualizerProps {
  title: string;
  data: any[];
  xKey: string;
  yKeys: {
    key: string;
    name: string;
    color: string;
  }[];
  description?: string;
}

const CHART_COLORS = [
  "#3498db", // Blue
  "#2ecc71", // Green
  "#e74c3c", // Red
  "#f39c12", // Orange
  "#9b59b6", // Purple
  "#1abc9c", // Teal
  "#34495e", // Dark Blue
];

const ChartVisualizer = ({
  title,
  data,
  xKey,
  yKeys,
  description,
}: ChartVisualizerProps) => {
  const [chartType, setChartType] = useState<"bar" | "line" | "pie" | "area">("bar");

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  background: "rgba(255, 255, 255, 0.9)", 
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }}
              />
              <Legend />
              {yKeys.map((y, index) => (
                <Bar
                  key={y.key}
                  dataKey={y.key}
                  name={y.name}
                  fill={y.color || CHART_COLORS[index % CHART_COLORS.length]}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  background: "rgba(255, 255, 255, 0.9)", 
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }}
              />
              <Legend />
              {yKeys.map((y, index) => (
                <Line
                  key={y.key}
                  type="monotone"
                  dataKey={y.key}
                  name={y.name}
                  stroke={y.color || CHART_COLORS[index % CHART_COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={1500}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Tooltip 
                contentStyle={{ 
                  background: "rgba(255, 255, 255, 0.9)", 
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }}
              />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
              <Pie
                data={data}
                cx="40%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey={yKeys[0].key}
                nameKey={xKey}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      yKeys[0].color || CHART_COLORS[index % CHART_COLORS.length]
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  background: "rgba(255, 255, 255, 0.9)", 
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }}
              />
              <Legend />
              {yKeys.map((y, index) => (
                <Area
                  key={y.key}
                  type="monotone"
                  dataKey={y.key}
                  name={y.name}
                  stroke={y.color || CHART_COLORS[index % CHART_COLORS.length]}
                  fill={`${y.color || CHART_COLORS[index % CHART_COLORS.length]}40`}
                  animationDuration={1500}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col">
        <div className="flex justify-between items-center p-5 border-b">
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Download className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Share2 className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-5">
            <Tabs
              defaultValue="bar"
              value={chartType}
              onValueChange={(value) => setChartType(value as any)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 w-full sm:w-80">
                <TabsTrigger value="bar" className="gap-1">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Bar</span>
                </TabsTrigger>
                <TabsTrigger value="line" className="gap-1">
                  <LineChartIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Line</span>
                </TabsTrigger>
                <TabsTrigger value="area" className="gap-1">
                  <AreaChartIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Area</span>
                </TabsTrigger>
                <TabsTrigger value="pie" className="gap-1">
                  <PieChartIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Pie</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="mt-3 h-[350px]">
            {renderChart()}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChartVisualizer;
