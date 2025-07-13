export type T_Audit = {
  id: string;
  userId: string;
  timestamp: Date;

  employeeDetails: {
    name: string;
    designation: string;
  };

  lastSprintDetails: {
    sprintName: string;
    completedTasks: string[];
    totalTasks: number;
  };

  review: {
    performanceRating: number;
    photoBase64: string;
    comments?: string;
  };
};
