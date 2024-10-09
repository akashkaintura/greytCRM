import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';

describe('EmployeeService', () => {
    let service: EmployeeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [EmployeeService]
        });

        service = TestBed.inject(EmployeeService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve employees', () => {
        const dummyEmployees: Employee[] = [
            { id: '1', name: 'John Doe', email: 'john@example.com', position: 'Developer', department: 'IT' },
            { id: '2', name: 'Jane Doe', email: 'jane@example.com', position: 'Manager', department: 'HR' }
        ];

        service.getEmployees().subscribe(employees => {
            expect(employees.length).toBe(2);
            expect(employees).toEqual(dummyEmployees);
        });

        const req = httpMock.expectOne(`${service['apiUrl']}`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyEmployees);
    });

    it('should add an employee', () => {
        const newEmployee: Employee = { name: 'New Employee', email: 'new@example.com', position: 'Tester', department: 'QA' };

        service.createEmployee(newEmployee).subscribe(employee => {
            expect(employee).toEqual({ ...newEmployee, id: '3' });
        });

        const req = httpMock.expectOne(`${service['apiUrl']}`);
        expect(req.request.method).toBe('POST');
        req.flush({ ...newEmployee, id: '3' });
    });
});