import { Component } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { UserInfo } from '../../common/user-info';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserUpdateRequest } from '../../interfaces/user-update-request';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  userInfo: UserInfo | null = null;
  constructor(private accountSerivce: AccountService) {}
  /**
   * Subscribes to the currentUser observable and updates the component's
   * userInfo field on change.
   */
  ngOnInit(): void {
    this.accountSerivce.getCurrentUser().subscribe((data) => {
      console.debug('Loading user data...');
      this.userInfo = data;
    });
  }
  updateUser(editUserForm: NgForm) {
    const updateUserRequest: UserUpdateRequest = {
      username: editUserForm.value.username,
      firstName: editUserForm.value.firstName,
      lastName: editUserForm.value.lastName,
      email: editUserForm.value.email,
      oldPassword: editUserForm.value.oldPassword,
      newPassword: editUserForm.value.newPassword,
    };
    this.accountSerivce.updateUserDetails(updateUserRequest).subscribe(
      (data) => {
        console.debug('Updating user details...');
        // this.userInfo = data;
      },
      (error) => {
        console.debug(error);
      }
    );
  }
}
