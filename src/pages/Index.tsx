
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ReportBuilder from "@/components/reports/ReportBuilder";
import StatsCard from "@/components/common/StatsCard";
import ChartVisualizer from "@/components/reports/ChartVisualizer";
import { vehiclePerformanceData, fleetUtilizationData, maintenanceData } from "@/utils/chartData";
import { Car, TrendingUp, AlertTriangle, Wrench, Route, Fuel } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-auto transition-all duration-300 ease-in-out p-4 md:p-6 lg:p-8 animate-fade-in">
          <div className="mx-auto max-w-7xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Fleet Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Monitor your fleet performance and create custom reports
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Active Vehicles"
                value="75"
                description="Out of 100 total vehicles"
                trend="up"
                trendValue="5%"
                icon={Car}
              />
              <StatsCard
                title="Fleet Efficiency"
                value="92%"
                description="Average across all routes"
                trend="up"
                trendValue="3%"
                icon={TrendingUp}
              />
              <StatsCard
                title="Maintenance Alerts"
                value="8"
                description="Vehicles requiring attention"
                trend="down"
                trendValue="12%"
                icon={Wrench}
              />
              <StatsCard
                title="Incidents"
                value="3"
                description="Reported in the last 30 days"
                trend="down"
                trendValue="25%"
                icon={AlertTriangle}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartVisualizer
                title="Vehicle Performance Trends"
                data={vehiclePerformanceData}
                xKey="month"
                yKeys={[
                  { key: "efficiency", name: "Efficiency %", color: "#3498db" },
                  { key: "maintenance", name: "Maintenance Events", color: "#e74c3c" },
                  { key: "incidents", name: "Incidents", color: "#f39c12" },
                ]}
                description="Monthly performance metrics for your fleet"
              />

              <ChartVisualizer
                title="Fleet Utilization"
                data={fleetUtilizationData}
                xKey="status"
                yKeys={[
                  { key: "value", name: "Percentage", color: "#3498db" },
                ]}
                description="Current utilization status of your fleet"
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <ChartVisualizer
                title="Maintenance Overview"
                data={maintenanceData}
                xKey="type"
                yKeys={[
                  { key: "count", name: "Number of Events", color: "#3498db" },
                  { key: "cost", name: "Cost ($)", color: "#e74c3c" },
                ]}
                description="Maintenance events by type and associated costs"
              />
            </div>

            <div className="mt-8">
              <Tabs defaultValue="reportBuilder">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 md:w-[400px]">
                  <TabsTrigger value="reportBuilder">Report Builder</TabsTrigger>
                  <TabsTrigger value="savedReports">Saved Reports</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>
                <TabsContent value="reportBuilder">
                  <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-4">Create Custom Report</h2>
                    <ReportBuilder />
                  </div>
                </TabsContent>
                <TabsContent value="savedReports">
                  <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-4">Saved Reports</h2>
                    <div className="p-8 text-center bg-muted/40 rounded-lg border border-dashed">
                      <p className="text-muted-foreground">You don't have any saved reports yet.</p>
                      <p className="text-muted-foreground mt-2">Create a new report to get started.</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="templates">
                  <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-4">Report Templates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                        <h3 className="font-medium">Fleet Overview</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Complete overview of all fleet metrics
                        </p>
                      </div>
                      <div className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                        <h3 className="font-medium">Fuel Consumption</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Detailed fuel usage analysis by vehicle
                        </p>
                      </div>
                      <div className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                        <h3 className="font-medium">Driver Performance</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Compare driver metrics and safety records
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
