import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leave, LeaveBalance } from '../models/leave.model';

@Injectable({
    providedIn: 'root'
})
export class LeaveService {
    private apiUrl = 'http://localhost:3000/api/leave';

    constructor(private http: HttpClient) { }

    getLeaveRequests(employeeId?: number, status?: string): Observable<Leave[]> {
        let params = new HttpParams();
        if (employeeId) params = params.set('employeeId', employeeId.toString());
        if (status) params = params.set('status', status);

        return this.http.get<Leave[]>(this.apiUrl, { params });
    }

    getLeaveRequest(id: number): Observable<Leave> {
        return this.http.get<Leave>(`${this.apiUrl}/${id}`);
    }

    submitLeaveRequest(leave: Omit<Leave, 'id' | 'status'>): Observable<Leave> {
        return this.http.post<Leave>(this.apiUrl, leave);
    }

    updateLeaveRequest(id: number, leave: Partial<Leave>): Observable<Leave> {
        return this.http.patch<Leave>(`${this.apiUrl}/${id}`, leave);
    }

    deleteLeaveRequest(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getLeaveBalance(employeeId: number): Observable<LeaveBalance> {
        return this.http.get<LeaveBalance>(`${this.apiUrl}/balance/${employeeId}`);
    }
}