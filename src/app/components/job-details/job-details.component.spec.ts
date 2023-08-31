import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { JobDetailsComponent } from './job-details.component';
import { JobService } from '../../job.services';
import { Job } from '../../job.model';

describe('JobDetailsComponent', () => {
	let component: JobDetailsComponent;
	let fixture: ComponentFixture<JobDetailsComponent>;
	let mockJobService: jasmine.SpyObj<JobService>;
	let mockRouter: jasmine.SpyObj<Router>;
	const mockJob: Job = {
		id: 1,
		job_number: '123',
		job_title: 'Test Job',
		job_start_date: '01/01/2023',
		job_close_date: '01/15/2023',
		experience_required: true,
		number_of_openings: 5,
		job_notes: 'Some notes',
	};

	beforeEach(() => {
		mockJobService = jasmine.createSpyObj('JobService', ['getJob', 'updateJob']);
		mockRouter = jasmine.createSpyObj('Router', ['navigate']);

		TestBed.configureTestingModule({
			declarations: [JobDetailsComponent],
			imports: [ReactiveFormsModule],
			providers: [
				{ provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
				{ provide: JobService, useValue: mockJobService },
				{ provide: Router, useValue: mockRouter },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(JobDetailsComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should fetch and populate job details on init', () => {
		mockJobService.getJob.and.returnValue(of(mockJob));

		fixture.detectChanges();

		expect(mockJobService.getJob).toHaveBeenCalledWith(1);
		expect(component.jobForm.value.job_number).toEqual(mockJob.job_number);
		expect(component.jobForm.value.job_title).toEqual(mockJob.job_title);
		expect(component.jobForm.value.job_start_date).toEqual(mockJob.job_start_date);
		expect(component.jobForm.value.job_close_date).toEqual(mockJob.job_close_date);
		expect(component.jobForm.value.experience_required).toEqual(mockJob.experience_required);
		expect(component.jobForm.value.number_of_openings).toEqual(mockJob.number_of_openings);
		expect(component.jobForm.value.job_notes).toEqual(mockJob.job_notes);
	});

	it('should update job and navigate when form is valid', () => {
		mockJobService.getJob.and.returnValue(of(mockJob));
		mockJobService.updateJob.and.returnValue(of(mockJob));

		fixture.detectChanges();

		component.jobForm.patchValue({
			id: 1,
			job_number: 'Updated Job Number',
			job_title: 'Test Job',
			job_start_date: '01/01/2023',
			job_close_date: '01/15/2023',
			experience_required: true,
			number_of_openings: 5,
			job_notes: 'Some notes',
		});

		component.updateJob();

		expect(mockJobService.updateJob).toHaveBeenCalledWith(1, {
			id: 1,
			job_number: 'Updated Job Number',
			job_title: 'Test Job',
			job_start_date: '01/01/2023',
			job_close_date: '01/15/2023',
			experience_required: true,
			number_of_openings: 5,
			job_notes: 'Some notes',

		});
		expect(mockRouter.navigate).toHaveBeenCalledWith(['/jobs']);
	});

	it('should not update job when form is invalid', () => {
		mockJobService.getJob.and.returnValue(of(mockJob));
		
		fixture.detectChanges();
	
		component.jobForm.controls['job_number'].setErrors({ someError: true });
	
		component.updateJob();
	
		expect(mockJobService.updateJob).not.toHaveBeenCalled(); // error so it shouldn't be called
		expect(mockRouter.navigate).not.toHaveBeenCalled(); // also should not navigate then
	});
});
