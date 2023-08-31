import { Component, HostListener, OnInit } from '@angular/core';
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
	currentPage = 1;
	itemsPerPage = 100;
	isLoading = false;

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
		if (this.isLoading) {
			return;
		}

		this.isLoading = true;
		this.jobService.getJobs(this.currentPage, this.itemsPerPage).subscribe(jobs => {
			this.jobs = this.jobs.concat(jobs);
			this.currentPage++;
			this.isLoading = false;
		});
	}

	@HostListener('window:scroll', ['$event'])
	onScroll(event: Event): void {
		if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
			this.loadJobs();
		}
	}
}
