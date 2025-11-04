import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  userdata!: FormGroup;
  editIndex: number | null = null; // 🟢 To track edit mode
  pdfPreviewUrl: string | null = null; // 🆕 For PDF preview

  constructor(private fb: FormBuilder, private router: Router, private userService: UserServiceService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.userdata = this.fb.group({
      userId:['',[Validators.required,Validators.pattern('^[0-9]+$')]],
      useremail: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      userdevice: ['', Validators.required],
      useraddress: ['', Validators.required],
      userpdf: [null] // 🆕 To store PDF file

    })
    // ✅ Check if there's an index in query params (for edit mode)
    this.route.queryParams.subscribe(params => {
      if (params['index'] !== undefined) {
        this.editIndex = +params['index']; // convert to number
        const user = this.userService.getUserByIndex(this.editIndex);
        if (user) {
          this.userdata.patchValue(user); // ✅ Pre-fill form
        }
      }
    });
  }

  // 🆕 Handle file upload
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        // this.pdfPreviewUrl = reader.result as string; // store base64 for preview
        this.userdata.patchValue({ userpdf: this.pdfPreviewUrl });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  }
  // ✅ Save or Update user
  submit() {
    if (this.userdata.valid) {
      const userData = this.userdata.value;

      if (this.editIndex !== null) {
        // 🔄 Edit mode
        this.userService.updateUser(this.editIndex, userData);
        alert('User updated successfully!');
      } else {
        // 🆕 Add mode
        this.userService.saveUser(userData);
        alert('Form submitted successfully!');
      }

      this.router.navigate(['/user/user-list']);
      this.userdata.reset();
    } else {
      this.userdata.markAllAsTouched();
    }
  }


}
