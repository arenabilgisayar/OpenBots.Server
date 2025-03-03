import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmailAccountComponent } from './add-email-account/add-email-account.component';
import { AllEmailAccountComponent } from './all-email-account/all-email-account.component';
import { EmailTestingAccountComponent } from './email-testing-account/email-testing-account.component';
import { GetEmailIdComponent } from './get-email-id/get-email-id.component';


const routes: Routes = [
  {
    path: 'list',
    component: AllEmailAccountComponent,
  },
  {
    path: 'get-email-id',
    component: GetEmailIdComponent,
  },
  {
    path: 'edit/:id',
    component: AddEmailAccountComponent,
  },
  {
    path: 'add',
    component: AddEmailAccountComponent,
  },
  {
    path: 'send-email',
    component: EmailTestingAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailAccountRoutingModule { }
