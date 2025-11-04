import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserinfoComponent } from './userinfo/userinfo.component';

const routes: Routes = [
    { path: '', redirectTo: 'user-list', pathMatch: 'full' },
  { path: 'user-form', component: UserFormComponent }, 
  { path: 'user-list', component: UserListComponent },
  { path: 'user-info/:id', component: UserinfoComponent },
];


@NgModule({
  declarations: [],
    imports: [
    RouterModule.forChild(routes) // ✅ Add this line
    ],
    exports: [RouterModule]
})
export class UserRoutingModule { }
