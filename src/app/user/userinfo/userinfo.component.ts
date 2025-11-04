import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  userForm!: FormGroup;
    pdfUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserServiceService
  ) {}

  ngOnInit() {
    // Create form
    this.userForm = this.fb.group({
      userId: [''],
      useremail: [''],
      username: [''],
      userdevice: [''],
      useraddress: [''],
       userpdf: [''] // ✅ Add this line
    });

    // Get userId from route
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Get all users from service
      const users = this.userService.getUsers();

      // ✅ Find the user where userId matches the route id
      const user = users.find(u => u.userId.toString() === id);

      if (user) {
        this.userForm.patchValue(user);
             this.pdfUrl = user.userpdf
      } else {
        console.warn(`User with ID ${id} not found`);
      }
    }
  }
}
