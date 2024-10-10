import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employeeForm: FormGroup;
  isAddMode: boolean;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(employees => {
      console.log('Employees:', employees);
    },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      department: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.employeeService.getEmployeeById(this.id)
        .subscribe(x => this.employeeForm.patchValue(x));
    }
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }

    if (this.isAddMode) {
      this.createEmployee();
    } else {
      this.updateEmployee();
    }
  }

  private createEmployee() {
    this.employeeService.createEmployee(this.employeeForm.value)
      .subscribe(
        () => {
          this.router.navigate(['/employees']);
        },
        error => {
          console.error('Error creating employee:', error);
        }
      );
  }

  private updateEmployee() {
    this.employeeService.updateEmployee(this.id, this.employeeForm.value)
      .subscribe(
        () => {
          this.router.navigate(['/employees']);
        },
        error => {
          console.error('Error updating employee:', error);
        }
      );
  }
}