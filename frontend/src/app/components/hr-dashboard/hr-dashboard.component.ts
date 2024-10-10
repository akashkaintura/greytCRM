import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HrDashboardService } from '../../services/hr-dashboard.service';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.css']
})
export class HrDashboardComponent implements OnInit {
  attendanceRate: number = 0;
  pendingLeaveRequests: number = 0;
  presentToday: number = 0;
  totalLeaveDays: number = 0;
  chart: any;

  constructor(private dashboardService: HrDashboardService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardService.getDashboardData().subscribe(
      (data) => {
        this.attendanceRate = data.attendanceRate;
        this.pendingLeaveRequests = data.pendingLeaveRequests;
        this.presentToday = data.presentToday;
        this.totalLeaveDays = data.totalLeaveDays;
        this.createChart(data.monthlyAttendance);
      },
      (error) => {
        console.error('Error fetching dashboard data', error);
        // Handle error (e.g., show error message to user)
      }
    );
  }

  createChart(monthlyAttendance: any[]) {
    this.chart = new Chart("monthlyAttendanceChart", {
      type: 'bar',
      data: {
        labels: monthlyAttendance.map(item => item.week),
        datasets: [{
          label: 'Attendance Rate',
          data: monthlyAttendance.map(item => item.rate),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
}