import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  pagedUsers: any[] = [];
  filteredUsers: any[] = [];
  pageSize = 5;
  pageIndex = 0;

  // ✅ Common search input
  searchText: string = '';

  // ✅ Column-wise search
  filters = {
    Id: '',
    email: '',
    name: '',
    device: '',
    address: ''
  };

  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  // ✅ Load all users from service/localStorage
  loadUsers() {
    this.users = this.userService.getUsers() || [];
    this.filteredUsers = [...this.users];
    this.updatePagedData();
  }

  // ✅ Common (global) filter for all columns
  applyCommonFilter() {
    const text = this.searchText.toLowerCase().trim();

    this.filteredUsers = this.users.filter(user =>
      user.userId.toString().toLowerCase().includes(text) ||
      user.useremail.toLowerCase().includes(text) ||
      user.username.toLowerCase().includes(text) ||
      user.userdevice.toLowerCase().includes(text) ||
      user.useraddress.toLowerCase().includes(text)
    );

    this.updatePagedData();
  }

  // ✅ Column-wise filter
  applyColumnFilter() {
    this.filteredUsers = this.users.filter(user =>
      user.userId.toString().includes(this.filters.Id) &&
      user.useremail.toLowerCase().includes(this.filters.email.toLowerCase()) &&
      user.username.toLowerCase().includes(this.filters.name.toLowerCase()) &&
      user.userdevice.toLowerCase().includes(this.filters.device.toLowerCase()) &&
      user.useraddress.toLowerCase().includes(this.filters.address.toLowerCase())
    );

    this.updatePagedData();
  }

  // ✅ Pagination handler
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedData();
  }

  // ✅ Update paged users
  updatePagedData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedUsers = this.filteredUsers.slice(start, end);
  }

  // ✅ Edit user (using actual index)
  editUser(index: number) {
    const actualIndex = this.pageIndex * this.pageSize + index;
    this.router.navigate(['/user/user-form'], { queryParams: { index: actualIndex } });
  }

  // ✅ Delete user (using actual index)
  deleteUser(index: number) {
    const actualIndex = this.pageIndex * this.pageSize + index;
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(actualIndex);
      alert('User deleted successfully!');
      this.loadUsers();
    }
  }

  // ✅ View details (using actual index)
  goOnId(index: number) {
    const actualIndex = this.pageIndex * this.pageSize + index;
    const selectedUser = this.filteredUsers[actualIndex];
    this.router.navigate([`/user/user-info/${selectedUser.userId}`]);
  }
//   viewUserInfo(index: number)
// {
//   // debugger
//   const users = this.userService.getUsers();
//   const user = users[index];

//   if (user) {
//     this.router.navigate(['/user/user-info', user.userId]);
//     alert('ok');
//   } else {
//     alert('User not found!');
//   }
// }
downloadPdf(user: any) {
  debugger
  if (!user || !user.userpdf) {
    alert('No PDF available for download');
    return;
  }

  // Create a download link
  const link = document.createElement('a');

  // If your file is base64
  if (user.userpdf.startsWith('data:application/pdf')) {
    link.href = user.userpdf;
  } else {
    // If it's a URL (like localhost:1524/sample.pdf)
    link.href = user.userpdf;
  }

  // Set the download filename
  link.download = user.username ? `${user.username}.pdf` : 'document.pdf';

  // Trigger the download
  link.click();
}


}
