import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    UserFormComponent,
    UserListComponent,
    UserinfoComponent
     
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
      ReactiveFormsModule,
      MatPaginatorModule,
      SharedModule,
          MatButtonModule,
    MatIconModule

  ],
  exports:[
    UserFormComponent,
    UserListComponent,
    UserinfoComponent
   
  ]
})
export class UserModule { }
