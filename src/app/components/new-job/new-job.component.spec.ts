import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { NewJobComponent } from './new-job.component';
import { JobService } from '../../job.services';
import { Job } from '../../job.model';

describe('NewJobComponent', () => {
  let component: NewJobComponent;
  let fixture: ComponentFixture<NewJobComponent>;
  let mockJobService: jasmine.SpyObj<JobService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
	mockJobService = jasmine.createSpyObj('JobService', ['createJob']);
	mockRouter = jasmine.createSpyObj('Router', ['navigate']);

	TestBed.configureTestingModule({
	  imports: [ReactiveFormsModule],
	  declarations: [NewJobComponent],
	  providers: [
		{
		  provide: ActivatedRoute,
		  useValue: {
			snapshot: { paramMap: { get: () => '1' } }
		  }
		},
		{ provide: JobService, useValue: mockJobService },
		{ provide: Router, useValue: mockRouter },
	  ],
	}).compileComponents();

	fixture = TestBed.createComponent(NewJobComponent);
	component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should create', () => {
	expect(component).toBeTruthy();
  });

  describe('createJob', () => {
	it('should create a new job and navigate to /jobs when form is valid', () => {
	  const job: Job = {
		id: 0,
		job_number: '123',
		job_title: 'Test Job',
		job_start_date: '01/01/2023',
		job_close_date: '01/15/2023',
		experience_required: true,
		number_of_openings: 5,
		job_notes: 'Some notes',
	  };

	  component.createJobForm.patchValue(job);

	  mockJobService.createJob.and.returnValue(of(job));
	  component.createJob();

	  expect(mockJobService.createJob).toHaveBeenCalledWith(job);
	  expect(mockRouter.navigate).toHaveBeenCalledWith(['/jobs']);
	});

	it('should show an error alert and log form details when form is invalid', () => {
	  spyOn(window, 'alert');
	  spyOn(console, 'log');
	  const invalidJob = {};

	  component.createJobForm.patchValue(invalidJob);

	  component.createJob();

	  expect(window.alert).toHaveBeenCalledWith('Error when creating Job');
	  expect(console.log).toHaveBeenCalledWith(component.createJobForm);
	});
  });
});
