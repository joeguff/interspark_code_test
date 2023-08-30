import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JobService } from '../../job.services';
import { Job } from '../../job.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})

export class JobListComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService, private router: Router,) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

  navigateToJobDetails(id: number): void {
    this.router.navigate(['/jobs', id]);
  }
   

  loadJobs(): void {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }
}
