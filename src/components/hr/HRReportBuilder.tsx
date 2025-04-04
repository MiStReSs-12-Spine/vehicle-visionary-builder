import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Download, FileText, Trash2, Calendar, Filter } from "lucide-react";
import DataGrid from "@/components/reports/DataGrid";
import { employeeData, departmentData } from "@/utils/hrData";

interface HRReportBuilderProps {
  subMenu: string;
}

const HRReportBuilder: React.FC<HRReportBuilderProps> = ({ subMenu }) => {
  const [reportName, setReportName] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>([
    "id", "name", "department", "position", "joinDate"
  ]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [reportType, setReportType] = useState("custom");
  const [savedReports, setSavedReports] = useState([
    { id: 1, name: "Monthly Attendance Summary", type: "attendance", created: "2023-05-10", lastRun: "2023-05-15" },
    { id: 2, name: "Department Headcount", type: "headcount", created: "2023-04-22", lastRun: "2023-05-14" },
    { id: 3, name: "Leave Balance Report", type: "leave", created: "2023-03-15", lastRun: "2023-05-12" },
  ]);

  // Available fields for report building
  const availableFields = [
    { id: "id", label: "Employee ID" },
    { id: "name", label: "Employee Name" },
    { id: "department", label: "Department" },
    { id: "position", label: "Position" },
    { id: "joinDate", label: "Join Date" },
    { id: "salary", label: "Salary" },
    { id: "manager", label: "Manager" },
    { id: "location", label: "Location" },
    { id: "status", label: "Status" },
    { id: "leaveBalance", label: "Leave Balance" },
    { id: "performance", label: "Performance Rating" },
    { id: "lastPromotion", label: "Last Promotion Date" },
  ];

  // Available filters
  const availableFilters = [
    { id: "department", label: "Department" },
    { id: "position", label: "Position" },
    { id: "joinDate", label: "Join Date" },
    { id: "location", label: "Location" },
    { id: "status", label: "Status" },
  ];

  // Toggle field selection
  const toggleField = (fieldId: string) => {
    setSelectedFields(current => 
      current.includes(fieldId) 
        ? current.filter(id => id !== fieldId) 
        : [...current, fieldId]
    );
  };

  // Toggle filter selection
  const toggleFilter = (filterId: string) => {
    setSelectedFilters(current => 
      current.includes(filterId) 
        ? current.filter(id => id !== filterId) 
        : [...current, filterId]
    );
  };

  // Generate preview data based on selected fields
  const previewData = employeeData.slice(0, 5).map(emp => {
    const filteredEmp: Record<string, any> = {};
    selectedFields.forEach(field => {
      if (field in emp) {
        filteredEmp[field] = emp[field as keyof typeof emp];
      }
    });
    return filteredEmp;
  });

  // Generate columns for preview
  const previewColumns = selectedFields.map(field => {
    const fieldInfo = availableFields.find(f => f.id === field);
    return {
      key: field,
      title: fieldInfo?.label || field,
      sortable: true,
    };
  });

  // Columns for saved reports
  const savedReportColumns = [
    { key: "name", title: "Report Name", sortable: true },
    { key: "type", title: "Type", sortable: true },
    { key: "created", title: "Created Date", sortable: true },
    { key: "lastRun", title: "Last Run", sortable: true },
    { 
      key: "actions", 
      title: "Actions", 
      sortable: false,
      render: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <FileText className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <Tabs value={reportType} onValueChange={setReportType}>
        <TabsList className="mb-4">
          <TabsTrigger value="custom">Custom Report</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="custom" className="space-y-6">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Report Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="report-name">Report Name</Label>
                <Input 
                  id="report-name" 
                  placeholder="Enter report name" 
                  className="mt-1" 
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                />
                
                <div className="mt-4">
                  <Label>Report Description (Optional)</Label>
                  <Textarea 
                    placeholder="Enter a description for this report" 
                    className="mt-1" 
                  />
                </div>
                
                <div className="mt-4">
                  <Label>Report Format</Label>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="format-excel" />
                      <Label htmlFor="format-excel">Excel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="format-pdf" />
                      <Label htmlFor="format-pdf">PDF</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="format-csv" />
                      <Label htmlFor="format-csv">CSV</Label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Label>Schedule (Optional)</Label>
                  <div className="flex gap-2 mt-1">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Set Time</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Selected Fields</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {availableFields.map((field) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`field-${field.id}`} 
                        checked={selectedFields.includes(field.id)}
                        onCheckedChange={() => toggleField(field.id)}
                      />
                      <Label htmlFor={`field-${field.id}`}>{field.label}</Label>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <Label>Filters</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {availableFilters.map((filter) => (
                      <div key={filter.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`filter-${filter.id}`} 
                          checked={selectedFilters.includes(filter.id)}
                          onCheckedChange={() => toggleFilter(filter.id)}
                        />
                        <Label htmlFor={`filter-${filter.id}`}>{filter.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedFilters.length > 0 && (
                  <div className="mt-4">
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Configure Filters</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">Cancel</Button>
              <Button variant="outline" className="gap-2">
                <Save className="h-4 w-4" />
                <span>Save</span>
              </Button>
              <Button className="gap-2">
                <FileText className="h-4 w-4" />
                <span>Generate Report</span>
              </Button>
            </div>
          </Card>
          
          {selectedFields.length > 0 && (
            <Card className="p-5">
              <h3 className="text-xl font-medium mb-4">Report Preview</h3>
              <DataGrid data={previewData} columns={previewColumns} />
              <p className="text-sm text-muted-foreground mt-2">Showing preview with 5 records</p>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="saved">
          <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium">Saved Reports</h3>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                <span>New Report</span>
              </Button>
            </div>
            <DataGrid data={savedReports} columns={savedReportColumns} />
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Scheduled Reports</h3>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Scheduled Reports</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">You haven't scheduled any reports yet.</p>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                <span>Schedule a Report</span>
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card className="p-5">
            <h3 className="text-xl font-medium mb-4">Report Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Employee Directory", description: "Basic employee information including contact details" },
                { name: "Department Headcount", description: "Headcount breakdown by department" },
                { name: "Leave Balance", description: "Current leave balances for all employees" },
                { name: "Attendance Summary", description: "Monthly attendance summary with absence rates" },
                { name: "Salary Distribution", description: "Salary distribution across departments and levels" },
                { name: "Performance Overview", description: "Performance ratings summary with trends" },
              ].map((template, index) => (
                <Card key={index} className="p-4 hover:bg-accent/50 cursor-pointer transition-colors">
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                  <div className="flex justify-end mt-4">
                    <Button variant="ghost" size="sm">Use Template</Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRReportBuilder;
