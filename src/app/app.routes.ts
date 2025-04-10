// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessmanagementsComponent } from './components/enquiryManagements/processmanagements.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'AMS/login', pathMatch: 'full' },
  { path: 'AMS/login', component: LoginComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'enquiryDashboard',
    component: ProcessmanagementsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
