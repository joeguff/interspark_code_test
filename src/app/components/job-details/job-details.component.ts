import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../job.services';
import { Job } from '../../job.model';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Import form-related modules

@Component({
	selector: 'app-job-details',
	templateUrl: './job-details.component.html',
	styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
	jobForm: FormGroup; // Create a FormGroup instance for the form

	constructor(
		private route: ActivatedRoute,
		private jobService: JobService,
		private router: Router
	) {
		this.jobForm = new FormGroup({
			job_id: new FormControl('', Validators.required),
			job_number: new FormControl('', Validators.required),
			job_title: new FormControl('', Validators.required),
			job_start_date: new FormControl('', Validators.required),
			job_close_date: new FormControl('', Validators.required),
			experience_required: new FormControl(false),
			number_of_openings: new FormControl('', Validators.required),
			job_notes: new FormControl('', Validators.required),
		});
	}

	ngOnInit(): void {
		const jobId = Number(this.route.snapshot.paramMap.get('id'));
		this.jobService.getJob(jobId).subscribe(job => {
			this.jobForm.setValue({
				job_id: job.id,
				job_number: job.job_number,
				job_title: job.job_title,
				job_start_date: job.job_start_date,
				job_close_date: job.job_close_date,
				experience_required: job.experience_required,
				number_of_openings: job.number_of_openings,
				job_notes: job.job_notes,
			});
		});
	}

	updateJob(): void {
		const jobId = Number(this.route.snapshot.paramMap.get('id'));
		if (this.jobForm.valid) {
			console.log(this.jobForm);
			const updatedJob: Job = {
				id: jobId,
				job_number: this.jobForm.value.job_number,
				job_title: this.jobForm.value.job_title,
				job_start_date: this.jobForm.value.job_start_date,
				job_close_date: this.jobForm.value.job_close_date,
				experience_required: this.jobForm.value.experience_required?true:false,
				number_of_openings: this.jobForm.value.number_of_openings,
				job_notes: this.jobForm.value.job_notes,
			};

			this.jobService.updateJob(updatedJob.id, updatedJob).subscribe(() => {
				this.router.navigate(['/jobs']);
			});
		}
	}
}
