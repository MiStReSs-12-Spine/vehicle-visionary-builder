
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
import QueryBuilder from "./QueryBuilder";
import ChartVisualizer from "./ChartVisualizer";
import DataGrid from "./DataGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  vehiclePerformanceData, 
  fuelConsumptionData, 
  driverPerformanceData,
  routeEfficiencyData
} from "@/utils/chartData";
import { toast } from "sonner";
import { Calendar, MapPin, Award, Briefcase, Users } from "lucide-react";

interface ReportBuilderProps {
  className?: string;
}

// Sample fields for the query builder
const queryFields = [
  { name: "Vehicle Type", type: "string" as const },
  { name: "Vehicle ID", type: "string" as const },
  { name: "Driver", type: "string" as const },
  { name: "Date", type: "date" as const },
  { name: "Fuel Consumption", type: "number" as const },
  { name: "Distance", type: "number" as const },
  { name: "Route", type: "string" as const },
  { name: "Maintenance Status", type: "boolean" as const },
  { name: "Efficiency Score", type: "number" as const },
  { name: "Incidents", type: "number" as const },
  { name: "Payroll Month", type: "string" as const },
  { name: "Location", type: "string" as const },
  { name: "Grade", type: "string" as const },
  { name: "Designation", type: "string" as const },
  { name: "Department", type: "string" as const },
];

// Sample columns for the data grid
const vehicleColumns = [
  { key: "vehicle", title: "Vehicle", sortable: true },
  { key: "consumption", title: "Fuel Consumption", sortable: true, 
    render: (value: number) => <span>{value} L/100km</span> },
  { key: "distance", title: "Distance", sortable: true, 
    render: (value: number) => <span>{value} km</span> },
  { key: "cost", title: "Cost", sortable: true, 
    render: (value: number) => <span>${value}</span> },
];

const driverColumns = [
  { key: "driver", title: "Driver", sortable: true },
  { key: "score", title: "Performance Score", sortable: true,
    render: (value: number) => <span>{value}%</span> },
  { key: "trips", title: "Trips", sortable: true },
  { key: "incidents", title: "Incidents", sortable: true },
];

const routeColumns = [
  { key: "route", title: "Route", sortable: true },
  { key: "efficiency", title: "Efficiency", sortable: true,
    render: (value: number) => <span>{value}%</span> },
  { key: "distance", title: "Distance", sortable: true,
    render: (value: number) => <span>{value} km</span> },
  { key: "time", title: "Average Time", sortable: true,
    render: (value: number) => <span>{value} hours</span> },
];

const ReportBuilder = ({ className }: ReportBuilderProps) => {
  const [reportName, setReportName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTab, setSelectedTab] = useState("query");
  const [currentDataset, setCurrentDataset] = useState("vehicles");
  
  // New filter states
  const [payrollMonth, setPayrollMonth] = useState("");
  const [location, setLocation] = useState("");
  const [grade, setGrade] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");

  // Sample data for filters
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const locations = ["Mumbai", "Bangalore", "Delhi", "Chennai", "Hyderabad", "Pune", "Kolkata"];
  const grades = ["A", "B", "C", "D", "E"];
  const designations = ["Manager", "Engineer", "Analyst", "Coordinator", "Supervisor", "Director", "VP"];
  const departments = ["Engineering", "Marketing", "HR", "Finance", "Operations", "Sales", "Customer Support", "IT", "Product"];

  // Handle query execution
  const handleRunQuery = () => {
    toast.success("Query executed successfully!");
    // In a real app, this would trigger an API call with the query parameters
    setSelectedTab("results");
  };

  // Handle saving the report
  const handleSaveReport = () => {
    if (!reportName) {
      toast.error("Please enter a report name");
      return;
    }
    
    toast.success(`Report "${reportName}" saved successfully!`);
    // In a real app, this would save the report configuration
  };

  // Get the appropriate data and columns based on selected dataset
  const getDatasetConfig = () => {
    switch (currentDataset) {
      case "vehicles":
        return { 
          data: fuelConsumptionData, 
          columns: vehicleColumns,
          title: "Vehicle Fuel Consumption",
          xKey: "vehicle",
          yKeys: [
            { key: "consumption", name: "Fuel Consumption", color: "#3498db" },
            { key: "distance", name: "Distance (km)", color: "#2ecc71" },
            { key: "cost", name: "Cost ($)", color: "#e74c3c" },
          ]
        };
      case "drivers":
        return { 
          data: driverPerformanceData, 
          columns: driverColumns,
          title: "Driver Performance",
          xKey: "driver",
          yKeys: [
            { key: "score", name: "Performance Score", color: "#3498db" },
            { key: "trips", name: "Trips", color: "#2ecc71" },
            { key: "incidents", name: "Incidents", color: "#e74c3c" },
          ]
        };
      case "routes":
        return { 
          data: routeEfficiencyData, 
          columns: routeColumns,
          title: "Route Efficiency",
          xKey: "route",
          yKeys: [
            { key: "efficiency", name: "Efficiency %", color: "#3498db" },
            { key: "distance", name: "Distance (km)", color: "#2ecc71" },
            { key: "time", name: "Average Time (h)", color: "#e74c3c" },
          ]
        };
      default:
        return { 
          data: fuelConsumptionData, 
          columns: vehicleColumns,
          title: "Vehicle Fuel Consumption",
          xKey: "vehicle",
          yKeys: [
            { key: "consumption", name: "Fuel Consumption", color: "#3498db" },
            { key: "distance", name: "Distance (km)", color: "#2ecc71" },
            { key: "cost", name: "Cost ($)", color: "#e74c3c" },
          ]
        };
    }
  };

  const { data, columns, title, xKey, yKeys } = getDatasetConfig();

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-6">
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

          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Report Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <div>
                <div className="flex items-center gap-1 mb-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Payroll Month</span>
                </div>
                <Select value={payrollMonth} onValueChange={setPayrollMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month.toLowerCase()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center gap-1 mb-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                </div>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc.toLowerCase()}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center gap-1 mb-1 text-sm text-muted-foreground">
                  <Award className="h-4 w-4" />
                  <span>Grade</span>
                </div>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((g) => (
                      <SelectItem key={g} value={g.toLowerCase()}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center gap-1 mb-1 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>Designation</span>
                </div>
                <Select value={designation} onValueChange={setDesignation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    {designations.map((des) => (
                      <SelectItem key={des} value={des.toLowerCase()}>
                        {des}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center gap-1 mb-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Department</span>
                </div>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept.toLowerCase()}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-between">
            <div className="flex gap-3">
              <Button
                variant={currentDataset === "vehicles" ? "default" : "outline"}
                onClick={() => setCurrentDataset("vehicles")}
              >
                Vehicles
              </Button>
              <Button
                variant={currentDataset === "drivers" ? "default" : "outline"}
                onClick={() => setCurrentDataset("drivers")}
              >
                Drivers
              </Button>
              <Button
                variant={currentDataset === "routes" ? "default" : "outline"}
                onClick={() => setCurrentDataset("routes")}
              >
                Routes
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
              description="Interactive visualization of the query results."
            />
            <DataGrid data={data} columns={columns} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReportBuilder;
