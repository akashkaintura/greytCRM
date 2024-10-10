export interface Leave {
    id: number;
    employeeId: number;
    startDate: Date;
    endDate: Date;
    type: 'annual' | 'sick' | 'personal' | 'unpaid';
    status: 'pending' | 'approved' | 'rejected';
    reason: string;
}

export interface LeaveBalance {
    employeeId: number;
    annualLeave: number;
    sickLeave: number;
    personalLeave: number;
}