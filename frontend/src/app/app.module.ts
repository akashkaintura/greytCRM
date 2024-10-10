// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { AttendanceLogComponent } from './components/attendance-log/attendance-log.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { HrDashboardComponent } from './components/hr-dashboard/hr-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

// Define routes
const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: HrDashboardComponent },
    { path: 'employees', component: EmployeeListComponent },
    { path: 'employees/:id', component: EmployeeDetailComponent },
    { path: 'attendance-log', component: AttendanceLogComponent },
    { path: 'leave-request', component: LeaveRequestComponent },
    // Add a wildcard route for a 404 page
    { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
    declarations: [
        AppComponent,
        EmployeeListComponent,
        EmployeeDetailComponent,
        AttendanceLogComponent,
        LeaveRequestComponent,
        HrDashboardComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }