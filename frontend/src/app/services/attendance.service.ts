import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance, AttendanceSummary } from '../models/attendance.model';

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {
    private apiUrl = 'http://localhost:3000/api/attendance';

    constructor(private http: HttpClient) { }

    getAttendanceRecords(employeeId?: number, startDate?: string, endDate?: string): Observable<Attendance[]> {
        let params = new HttpParams();
        if (employeeId) params = params.set('employeeId', employeeId.toString());
        if (startDate) params = params.set('startDate', startDate);
        if (endDate) params = params.set('endDate', endDate);

        return this.http.get<Attendance[]>(this.apiUrl, { params });
    }

    checkIn(employeeId: number): Observable<Attendance> {
        return this.http.post<Attendance>(`${this.apiUrl}/check-in`, { employeeId });
    }

    checkOut(employeeId: number): Observable<Attendance> {
        return this.http.post<Attendance>(`${this.apiUrl}/check-out`, { employeeId });
    }

    getAttendanceSummary(employeeId: number, startDate: string, endDate: string): Observable<AttendanceSummary> {
        let params = new HttpParams()
            .set('employeeId', employeeId.toString())
            .set('startDate', startDate)
            .set('endDate', endDate);

        return this.http.get<AttendanceSummary>(`${this.apiUrl}/summary`, { params });
    }
}