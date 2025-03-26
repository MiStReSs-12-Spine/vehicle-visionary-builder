
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Play, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface Field {
  name: string;
  type: "string" | "number" | "date" | "boolean";
  options?: string[];
}

interface ConditionGroup {
  id: string;
  type: "AND" | "OR";
  conditions: Condition[];
}

interface Condition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface QueryBuilderProps {
  fields: Field[];
  onRunQuery?: (query: QueryState) => void;
  onSaveQuery?: (query: QueryState) => void;
  className?: string;
}

interface QueryState {
  groups: ConditionGroup[];
}

const operators = {
  string: ["equals", "contains", "starts with", "ends with", "is empty", "is not empty"],
  number: ["equals", "greater than", "less than", "between", "is empty", "is not empty"],
  date: ["on", "before", "after", "between", "is empty", "is not empty"],
  boolean: ["is true", "is false"],
};

const initialGroup = (): ConditionGroup => ({
  id: `group-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  type: "AND",
  conditions: [
    {
      id: `condition-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      field: "",
      operator: "",
      value: "",
    },
  ],
});

const QueryBuilder = ({ fields, onRunQuery, onSaveQuery, className }: QueryBuilderProps) => {
  const [query, setQuery] = useState<QueryState>({
    groups: [initialGroup()],
  });

  const getOperatorsForField = (fieldName: string): string[] => {
    const field = fields.find((f) => f.name === fieldName);
    return field ? operators[field.type] || [] : [];
  };

  const getFieldType = (fieldName: string): string => {
    const field = fields.find((f) => f.name === fieldName);
    return field ? field.type : "string";
  };

  const handleGroupTypeChange = (groupId: string, newType: "AND" | "OR") => {
    setQuery((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.id === groupId ? { ...group, type: newType } : group
      ),
    }));
  };

  const handleFieldChange = (groupId: string, conditionId: string, value: string) => {
    setQuery((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              conditions: group.conditions.map((condition) =>
                condition.id === conditionId
                  ? { ...condition, field: value, operator: "", value: "" }
                  : condition
              ),
            }
          : group
      ),
    }));
  };

  const handleOperatorChange = (groupId: string, conditionId: string, value: string) => {
    setQuery((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              conditions: group.conditions.map((condition) =>
                condition.id === conditionId
                  ? { ...condition, operator: value }
                  : condition
              ),
            }
          : group
      ),
    }));
  };

  const handleValueChange = (groupId: string, conditionId: string, value: string) => {
    setQuery((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              conditions: group.conditions.map((condition) =>
                condition.id === conditionId
                  ? { ...condition, value }
                  : condition
              ),
            }
          : group
      ),
    }));
  };

  const addCondition = (groupId: string) => {
    setQuery((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              conditions: [
                ...group.conditions,
                {
                  id: `condition-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  field: "",
                  operator: "",
                  value: "",
                },
              ],
            }
          : group
      ),
    }));
  };

  const removeCondition = (groupId: string, conditionId: string) => {
    setQuery((prev) => ({
      ...prev,
      groups: prev.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              conditions: group.conditions.filter(
                (condition) => condition.id !== conditionId
              ),
            }
          : group
      ),
    }));
  };

  const addGroup = () => {
    setQuery((prev) => ({
      ...prev,
      groups: [...prev.groups, initialGroup()],
    }));
  };

  const removeGroup = (groupId: string) => {
    setQuery((prev) => ({
      ...prev,
      groups: prev.groups.filter((group) => group.id !== groupId),
    }));
  };

  const runQuery = () => {
    if (onRunQuery) {
      onRunQuery(query);
    }
  };

  const saveQuery = () => {
    if (onSaveQuery) {
      onSaveQuery(query);
    }
  };

  return (
    <Card className={cn("p-5", className)}>
      <div className="space-y-5">
        {query.groups.map((group, groupIndex) => (
          <div
            key={group.id}
            className="p-4 border rounded-md shadow-sm bg-secondary/40 animate-fade-in"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">
                  {groupIndex === 0 ? "Where" : "And where"}
                </span>
                <Select
                  value={group.type}
                  onValueChange={(value) =>
                    handleGroupTypeChange(group.id, value as "AND" | "OR")
                  }
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AND">AND</SelectItem>
                    <SelectItem value="OR">OR</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">
                  of the following conditions are true
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeGroup(group.id)}
                disabled={query.groups.length === 1}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {group.conditions.map((condition) => (
                <div
                  key={condition.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
                >
                  <div className="md:col-span-3">
                    <Select
                      value={condition.field}
                      onValueChange={(value) =>
                        handleFieldChange(group.id, condition.id, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        {fields.map((field) => (
                          <SelectItem key={field.name} value={field.name}>
                            {field.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-3">
                    <Select
                      value={condition.operator}
                      onValueChange={(value) =>
                        handleOperatorChange(group.id, condition.id, value)
                      }
                      disabled={!condition.field}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select operator" />
                      </SelectTrigger>
                      <SelectContent>
                        {condition.field &&
                          getOperatorsForField(condition.field).map((op) => (
                            <SelectItem key={op} value={op}>
                              {op}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-5">
                    {condition.field && condition.operator ? (
                      getFieldType(condition.field) === "boolean" ? (
                        <div className="h-10 flex items-center px-3 rounded-md border border-input">
                          <span className="text-muted-foreground">
                            {condition.operator === "is true" ? "True" : "False"}
                          </span>
                        </div>
                      ) : (
                        <Input
                          type={
                            getFieldType(condition.field) === "number"
                              ? "number"
                              : getFieldType(condition.field) === "date"
                              ? "date"
                              : "text"
                          }
                          value={condition.value}
                          onChange={(e) =>
                            handleValueChange(
                              group.id,
                              condition.id,
                              e.target.value
                            )
                          }
                          placeholder={`Enter ${
                            getFieldType(condition.field) === "date"
                              ? "date"
                              : "value"
                          }`}
                          disabled={
                            condition.operator === "is empty" ||
                            condition.operator === "is not empty"
                          }
                        />
                      )
                    ) : (
                      <Input disabled placeholder="Enter value" />
                    )}
                  </div>

                  <div className="md:col-span-1 flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCondition(group.id, condition.id)}
                      disabled={group.conditions.length === 1}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addCondition(group.id)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add condition
              </Button>
            </div>
          </div>
        ))}

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={addGroup}>
            <Plus className="h-4 w-4 mr-1" />
            Add group
          </Button>
          <Button variant="default" size="sm" onClick={runQuery}>
            <Play className="h-4 w-4 mr-1" />
            Run query
          </Button>
          <Button variant="outline" size="sm" onClick={saveQuery}>
            <Save className="h-4 w-4 mr-1" />
            Save query
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QueryBuilder;
