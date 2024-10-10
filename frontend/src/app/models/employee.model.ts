export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    hireDate: Date;
    position: string;
    department: string;
    salary: number;
    isActive: boolean;
}