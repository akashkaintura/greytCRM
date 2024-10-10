export interface Attendance {
    id: number;
    employeeId: number;
    date: Date;
    checkIn: Date;
    checkOut: Date | null;
    status: 'present' | 'absent' | 'late' | 'half-day';
}

export interface AttendanceSummary {
    totalPresent: number;
    totalAbsent: number;
    totalLate: number;
    totalHalfDay: number;
}