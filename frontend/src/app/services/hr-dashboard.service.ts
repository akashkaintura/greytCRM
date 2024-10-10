import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HrDashboardService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    getDashboardData(): Observable<any> {
        const attendanceRate = this.http.get(`${this.apiUrl}/attendance/rate`);
        const pendingLeaveRequests = this.http.get(`${this.apiUrl}/leave/pending`);
        const presentToday = this.http.get(`${this.apiUrl}/attendance/present-today`);
        const totalLeaveDays = this.http.get(`${this.apiUrl}/leave/total-this-month`);
        const monthlyAttendance = this.http.get(`${this.apiUrl}/attendance/monthly-trend`);

        return forkJoin({
            attendanceRate,
            pendingLeaveRequests,
            presentToday,
            totalLeaveDays,
            monthlyAttendance
        });
    }
}