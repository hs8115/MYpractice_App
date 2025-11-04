import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
private storageKey = 'users'; 

  // // Save new user
  // saveUser(user: any) {
  //   // get existing data (array)
  //   const existingUsers = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    
  //   // add new user to array
  //   existingUsers.push(user);
    
  //   // store updated array back to localStorage
  //   localStorage.setItem(this.storageKey, JSON.stringify(existingUsers));
  // }
  saveUser(user: any) {
  const existingUsers = this.getUsers();  
  existingUsers.unshift(user);   // ✅ adds to the START of the array
  localStorage.setItem(this.storageKey, JSON.stringify(existingUsers));
}


  // Get all users
  getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
  // ✅ Delete user by index
  deleteUser(index: number) {
    const users = this.getUsers(); // Get current users
    users.splice(index, 1); // Remove one user at given index
    localStorage.setItem(this.storageKey, JSON.stringify(users)); // Save updated list
  }
  //edit
  getUserByIndex(index: number) {
    const users = this.getUsers();
    return users[index];
  }

  // ✅ Update user
  updateUser(index: number, updatedUser: any) {
    const users = this.getUsers();
    users[index] = updatedUser;
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Clear all users (optional)
  clearUsers() {
    localStorage.removeItem(this.storageKey);
  }
  
  
}

