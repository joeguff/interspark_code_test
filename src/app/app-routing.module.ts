import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewJobComponent } from './components/new-job/new-job.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  { path: 'jobs', loadChildren: () => import('./jobs.module').then(m => m.JobsModule) },
  { path: 'jobs/new', component: NewJobComponent, pathMatch: 'full' },
  { path: 'jobs/:id', component: JobDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
