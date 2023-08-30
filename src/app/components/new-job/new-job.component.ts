import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobService } from '../../job.services';
import { Job } from '../../job.model';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent implements OnInit {
  createJobForm: FormGroup; // Create a FormGroup instance for the form

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router
  ) {
    this.createJobForm = new FormGroup({
      job_id: new FormControl('0', Validators.required),
      job_number: new FormControl('', Validators.required),
      job_title: new FormControl('', Validators.required),
      job_start_date: new FormControl('', Validators.required),
      job_close_date: new FormControl('', Validators.required),
      experience_required: new FormControl(false),
      number_of_openings: new FormControl('', Validators.required),
      job_notes: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  createJob(): void {
    if (this.createJobForm.valid) {
      const newJob: Job = {
        id: 0,
        job_number: this.createJobForm.value.job_number,
        job_title: this.createJobForm.value.job_title,
        job_start_date: this.createJobForm.value.job_start_date,
        job_close_date: this.createJobForm.value.job_close_date,
        experience_required: this.createJobForm.value.experience_required,
        number_of_openings: this.createJobForm.value.number_of_openings,
        job_notes: this.createJobForm.value.job_notes,
      };

      this.jobService.createJob(newJob).subscribe(() => {
        this.router.navigate(['/jobs']);
      });
    } else {
      console.log(this.createJobForm);
    }
  }
}