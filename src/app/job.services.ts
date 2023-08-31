import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from './job.model';

@Injectable({
	providedIn: 'root'
})

export class JobService {
	private apiUrl = 'http://localhost:8000/jobs';

	constructor(private http: HttpClient) {}

	getJobs(page: number, itemsPerPage: number): Observable<Job[]> {
		const params = {
			_page: page.toString(),
			_limit: itemsPerPage.toString()
		};
	
		return this.http.get<Job[]>(this.apiUrl, { params });
	}

	getJob(id: number): Observable<Job> {
		return this.http.get<Job>(`${this.apiUrl}/${id}`);
	}

	createJob(job: Job): Observable<Job> {
		return this.http.post<Job>(this.apiUrl, job);
	}

	updateJob(id: number, job: Job): Observable<Job> {
		return this.http.put<Job>(`${this.apiUrl}/${id}`, job);
	}

	deleteJob(id: number): Observable<any> {
		return this.http.delete(`${this.apiUrl}/${id}`);
	}
}
