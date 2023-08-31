import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JobListComponent } from './job-list.component';
import { JobService } from '../../job.services';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Job } from '../../job.model';

class MockJobService {
	getJobs(): Observable<Job[]> {
		return of([]);
	}
}

class MockRouter {
	url = '';
	navigate(a: any): void {}
}

describe('JobListComponent', () => {
	let component: JobListComponent;
	let fixture: ComponentFixture<JobListComponent>;
	let mockJobService: MockJobService;
	let mockRouter: MockRouter;

	beforeEach(async () => {
		mockJobService = new MockJobService();
		mockRouter = new MockRouter();

		await TestBed.configureTestingModule({
			declarations: [JobListComponent],
			providers: [
				{ provide: JobService, useValue: mockJobService },
				{ provide: Router, useValue: mockRouter },
			],
			imports: [RouterTestingModule],
		}).compileComponents();
	});
	beforeEach(async () => {
		mockJobService = new MockJobService();
		mockRouter = new MockRouter();

		await TestBed.configureTestingModule({
			declarations: [JobListComponent],
			providers: [
				{ provide: JobService, useValue: mockJobService },
				{ provide: Router, useValue: mockRouter },
			],
			imports: [RouterTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(JobListComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call loadJobs on init', () => {
		spyOn(component, 'loadJobs');
		component.ngOnInit();
		expect(component.loadJobs).toHaveBeenCalled();
	});

	it('should have a route', () => {
		mockRouter.url = '/jobs/1';
		const result = component.hasRoute('/jobs');
		expect(result).toBeTruthy();
	});

	it('should not have a route', () => {
		mockRouter.url = '/other';
		const result = component.hasRoute('/jobs');
		expect(result).toBeFalsy();
	});

	it('should navigate to job details', () => {
		spyOn(mockRouter, 'navigate');
		component.navigateToJobDetails(1);
		expect(mockRouter.navigate).toHaveBeenCalledWith(['/jobs', 1]);
	});

	it('should load jobs', () => {
		const dummyJobs: Job[] = [{"id": 1,
		"job_number": "411-AKJ",
		"job_title": "Software Developer",
		"job_start_date": "2023-12-14",
		"job_close_date": "2023-12-14",
		"experience_required": true,
		"number_of_openings": 1,
		"job_notes": "Frontend Developer(Angular)"}];
		spyOn(mockJobService, 'getJobs').and.returnValue(of(dummyJobs));
		component.loadJobs();
		expect(component.jobs).toEqual(dummyJobs);
	});
});
