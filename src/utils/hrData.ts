
// Sample employee data for dashboards
export const employeeData = [
  { id: 1, name: "John Doe", gender: "Male", department: "Engineering", position: "Developer", level: "Senior", shift: "Morning", joinDate: "2020-01-15", status: "Active" },
  { id: 2, name: "Jane Smith", gender: "Female", department: "Marketing", position: "Manager", level: "Lead", shift: "Morning", joinDate: "2019-03-22", status: "Active" },
  { id: 3, name: "Robert Johnson", gender: "Male", department: "HR", position: "Specialist", level: "Mid", shift: "Evening", joinDate: "2021-05-10", status: "Active" },
  { id: 4, name: "Emily Davis", gender: "Female", department: "Finance", position: "Analyst", level: "Junior", shift: "Night", joinDate: "2022-02-18", status: "Active" },
  { id: 5, name: "Michael Wilson", gender: "Male", department: "Operations", position: "Director", level: "Executive", shift: "Morning", joinDate: "2018-11-05", status: "Active" },
  { id: 6, name: "Sarah Brown", gender: "Female", department: "Engineering", position: "QA Engineer", level: "Senior", shift: "Evening", joinDate: "2020-07-30", status: "Active" },
  { id: 7, name: "David Thompson", gender: "Male", department: "Sales", position: "Representative", level: "Mid", shift: "Morning", joinDate: "2021-09-12", status: "Active" },
  { id: 8, name: "Lisa Martinez", gender: "Female", department: "Customer Support", position: "Specialist", level: "Junior", shift: "Night", joinDate: "2022-04-25", status: "Active" },
  { id: 9, name: "James Anderson", gender: "Male", department: "IT", position: "System Admin", level: "Senior", shift: "Morning", joinDate: "2019-08-14", status: "Inactive" },
  { id: 10, name: "Patricia Thomas", gender: "Female", department: "Product", position: "Manager", level: "Lead", shift: "Evening", joinDate: "2020-06-03", status: "Active" },
];

// Attendance data
export const attendanceData = [
  { id: 1, employeeId: 1, date: "2023-05-01", status: "Present", inTime: "09:00", outTime: "18:00", late: false, earlyLeaving: false },
  { id: 2, employeeId: 2, date: "2023-05-01", status: "Present", inTime: "09:15", outTime: "18:00", late: true, earlyLeaving: false },
  { id: 3, employeeId: 3, date: "2023-05-01", status: "Absent", inTime: "", outTime: "", late: false, earlyLeaving: false },
  { id: 4, employeeId: 4, date: "2023-05-01", status: "Present", inTime: "09:05", outTime: "17:30", late: false, earlyLeaving: true },
  { id: 5, employeeId: 5, date: "2023-05-01", status: "Present", inTime: "08:55", outTime: "18:10", late: false, earlyLeaving: false },
  { id: 6, employeeId: 1, date: "2023-05-02", status: "Present", inTime: "09:00", outTime: "18:00", late: false, earlyLeaving: false },
  { id: 7, employeeId: 2, date: "2023-05-02", status: "Present", inTime: "09:10", outTime: "18:00", late: true, earlyLeaving: false },
  { id: 8, employeeId: 3, date: "2023-05-02", status: "Absent", inTime: "", outTime: "", late: false, earlyLeaving: false },
  { id: 9, employeeId: 4, date: "2023-05-02", status: "Present", inTime: "09:00", outTime: "17:40", late: false, earlyLeaving: true },
  { id: 10, employeeId: 5, date: "2023-05-02", status: "Present", inTime: "08:50", outTime: "18:05", late: false, earlyLeaving: false },
];

// Leave data
export const leaveData = [
  { id: 1, employeeId: 1, type: "Annual", startDate: "2023-06-10", endDate: "2023-06-15", duration: 5, status: "Approved", approvedBy: "Michael Wilson" },
  { id: 2, employeeId: 2, type: "Sick", startDate: "2023-05-22", endDate: "2023-05-23", duration: 2, status: "Approved", approvedBy: "Michael Wilson" },
  { id: 3, employeeId: 3, type: "Annual", startDate: "2023-07-05", endDate: "2023-07-10", duration: 5, status: "Pending", approvedBy: "" },
  { id: 4, employeeId: 4, type: "Personal", startDate: "2023-05-18", endDate: "2023-05-18", duration: 1, status: "Approved", approvedBy: "Robert Johnson" },
  { id: 5, employeeId: 5, type: "Annual", startDate: "2023-08-15", endDate: "2023-08-30", duration: 15, status: "Rejected", approvedBy: "Patricia Thomas" },
];

// Exit/Attrition data
export const exitData = [
  { id: 1, employeeId: 9, exitDate: "2023-04-20", reason: "New opportunity", type: "Resignation", noticePeriod: 30, compliant: true, feedback: "Better salary and benefits" },
  { id: 2, employeeId: 11, exitDate: "2023-03-15", reason: "Personal reasons", type: "Resignation", noticePeriod: 30, compliant: true, feedback: "Relocating to another city" },
  { id: 3, employeeId: 12, exitDate: "2023-02-28", reason: "Poor performance", type: "Termination", noticePeriod: 0, compliant: true, feedback: "Failed to meet targets consistently" },
  { id: 4, employeeId: 13, exitDate: "2023-01-10", reason: "End of contract", type: "Retirement", noticePeriod: 90, compliant: true, feedback: "Positive overall experience" },
  { id: 5, employeeId: 14, exitDate: "2022-12-05", reason: "New opportunity", type: "Resignation", noticePeriod: 15, compliant: false, feedback: "Better work-life balance" },
];

// Overtime data
export const overtimeData = [
  { id: 1, employeeId: 1, date: "2023-05-05", hours: 2, approved: true, approvedBy: "Michael Wilson" },
  { id: 2, employeeId: 2, date: "2023-05-06", hours: 1.5, approved: true, approvedBy: "Michael Wilson" },
  { id: 3, employeeId: 3, date: "2023-05-07", hours: 3, approved: false, approvedBy: "" },
  { id: 4, employeeId: 4, date: "2023-05-08", hours: 1, approved: true, approvedBy: "Robert Johnson" },
  { id: 5, employeeId: 5, date: "2023-05-09", hours: 2.5, approved: true, approvedBy: "Patricia Thomas" },
];

// Generate monthly summary data
export const generateMonthlySummary = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map(month => {
    return {
      month,
      headcount: Math.floor(Math.random() * 50) + 100,
      attendance: Math.floor(Math.random() * 10) + 90,
      absentRate: Math.floor(Math.random() * 10),
      overtimeHours: Math.floor(Math.random() * 200) + 100,
      newHires: Math.floor(Math.random() * 10),
      exits: Math.floor(Math.random() * 5),
      attritionRate: Math.floor(Math.random() * 5),
    };
  });
};

export const monthlySummaryData = generateMonthlySummary();

// Department data
export const departmentData = [
  { name: "Engineering", headcount: 45, maleCount: 30, femaleCount: 15 },
  { name: "Marketing", headcount: 20, maleCount: 8, femaleCount: 12 },
  { name: "HR", headcount: 10, maleCount: 3, femaleCount: 7 },
  { name: "Finance", headcount: 15, maleCount: 7, femaleCount: 8 },
  { name: "Operations", headcount: 25, maleCount: 15, femaleCount: 10 },
  { name: "Sales", headcount: 30, maleCount: 18, femaleCount: 12 },
  { name: "Customer Support", headcount: 20, maleCount: 9, femaleCount: 11 },
  { name: "IT", headcount: 15, maleCount: 12, femaleCount: 3 },
  { name: "Product", headcount: 10, maleCount: 6, femaleCount: 4 },
];

// Level data
export const levelData = [
  { name: "Executive", count: 5, maleCount: 4, femaleCount: 1 },
  { name: "Lead", count: 15, maleCount: 10, femaleCount: 5 },
  { name: "Senior", count: 40, maleCount: 25, femaleCount: 15 },
  { name: "Mid", count: 60, maleCount: 35, femaleCount: 25 },
  { name: "Junior", count: 70, maleCount: 30, femaleCount: 40 },
];

// Shift data
export const shiftData = [
  { name: "Morning", count: 120, maleCount: 65, femaleCount: 55 },
  { name: "Evening", count: 50, maleCount: 30, femaleCount: 20 },
  { name: "Night", count: 20, maleCount: 15, femaleCount: 5 },
];
