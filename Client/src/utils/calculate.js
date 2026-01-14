export const calculateWorkingHours = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffMs = end - start;

  return (diffMs / (1000 * 60 * 60)).toFixed(2); // Convert to hours
};

export const calculateAttendanceRate = (presentDays, totalDays) => {
  if (totalDays === 0) return 0;
  return ((presentDays / totalDays) * 100).toFixed(2);
};

export const calculateTaskCompletionRate = (completedTasks, totalTasks) => {
  if (totalTasks === 0) return 0;
  return ((completedTasks / totalTasks) * 100).toFixed(2);
};

export const calculateProductivityScore = (tasksCompleted, hoursWorked) => {
  if (hoursWorked === 0) return 0;
  return ((tasksCompleted / hoursWorked) * 100).toFixed(2);
};

export const calculateSalary = (basic, allowances = [], deductions = []) => {
  const totalAllowances = allowances.reduce(
    (sum, allowance) => sum + allowance.amount,
    0
  );
  const totalDeductions = deductions.reduce(
    (sum, deduction) => sum + deduction.amount,
    0
  );

  const gross = basic + totalAllowances;
  const net = gross - totalDeductions;

  return {
    basic,
    totalAllowances,
    totalDeductions,
    gross,
    net,
  };
};

export const calculateTax = (annualSalary, taxSlabs = []) => {
  let remainingSalary = annualSalary;
  let totalTax = 0;

  taxSlabs.sort((a, b) => a.min - b.min);

  for (const slab of taxSlabs) {
    if (remainingSalary <= 0) break;

    const slabAmount = Math.min(
      remainingSalary,
      slab.max ? slab.max - slab.min : remainingSalary
    );

    totalTax += slabAmount * (slab.rate / 100);
    remainingSalary -= slabAmount;
  }

  return totalTax;
};

export const calculateAge = (birthDate) => {
  if (!birthDate) return 0;

  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export const calculateExperience = (joinDate) => {
  if (!joinDate) return "0 years";

  const today = new Date();
  const join = new Date(joinDate);

  const diffMs = today - join;
  const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);

  const years = Math.floor(diffYears);
  const months = Math.floor((diffYears - years) * 12);

  if (years === 0) {
    return `${months} month${months !== 1 ? "s" : ""}`;
  } else if (months === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  } else {
    return `${years} year${years !== 1 ? "s" : ""} ${months} month${
      months !== 1 ? "s" : ""
    }`;
  }
};

export const calculateProgress = (current, target) => {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
};

export const calculateTrend = (currentValue, previousValue) => {
  if (previousValue === 0) return 0;

  const change = ((currentValue - previousValue) / previousValue) * 100;
  return change.toFixed(2);
};

export const calculateAverage = (values) => {
  if (!values || values.length === 0) return 0;

  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};

export const calculateMedian = (values) => {
  if (!values || values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  } else {
    return sorted[middle];
  }
};

export const calculateStandardDeviation = (values) => {
  if (!values || values.length === 0) return 0;

  const mean = calculateAverage(values);
  const squaredDiffs = values.map((value) => Math.pow(value - mean, 2));
  const variance = calculateAverage(squaredDiffs);

  return Math.sqrt(variance);
};
