import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';
import { Leave, LeaveBalance } from '../../models/leave.model';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  leaveForm: FormGroup;
  leaveBalance: LeaveBalance | null = null;
  submitting = false;
  submitError: string | null = null;
  submitSuccess = false;

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService
  ) {
    this.leaveForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      type: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadLeaveBalance();
  }

  loadLeaveBalance(): void {
    // Assuming we have the employee's ID available (e.g., from authentication)
    const employeeId = 1; // Replace with actual employee ID
    this.leaveService.getLeaveBalance(employeeId).subscribe(
      (balance) => {
        this.leaveBalance = balance;
      },
      (error) => {
        console.error('Error fetching leave balance:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.leaveForm.valid) {
      this.submitting = true;
      this.submitError = null;
      this.submitSuccess = false;

      const leaveRequest: Omit<Leave, 'id' | 'status'> = {
        ...this.leaveForm.value,
        employeeId: 1, // Replace with actual employee ID
      };

      this.leaveService.submitLeaveRequest(leaveRequest).subscribe(
        () => {
          this.submitting = false;
          this.submitSuccess = true;
          this.leaveForm.reset();
          this.loadLeaveBalance();
        },
        (error) => {
          this.submitting = false;
          this.submitError = 'Failed to submit leave request. Please try again.';
          console.error('Error submitting leave request:', error);
        }
      );
    }
  }
}