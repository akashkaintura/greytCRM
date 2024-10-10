import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { Attendance } from '../../models/attendance.model';

@Component({
  selector: 'app-attendance-log',
  templateUrl: './attendance-log.component.html',
  styleUrls: ['./attendance-log.component.css']
})
export class AttendanceLogComponent implements OnInit {
  attendanceRecords: Attendance[] = [];
  loading = false;
  error: string | null = null;

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.loadAttendanceRecords();
  }

  loadAttendanceRecords(): void {
    this.loading = true;
    this.attendanceService.getAttendanceRecords().subscribe(
      (data) => {
        this.attendanceRecords = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load attendance records. Please try again later.';
        this.loading = false;
        console.error('Error loading attendance records:', error);
      }
    );
  }

  checkIn(employeeId: number): void {
    this.attendanceService.checkIn(employeeId).subscribe(
      () => this.loadAttendanceRecords(),
      (error) => console.error('Error checking in:', error)
    );
  }

  checkOut(employeeId: number): void {
    this.attendanceService.checkOut(employeeId).subscribe(
      () => this.loadAttendanceRecords(),
      (error) => console.error('Error checking out:', error)
    );
  }
}