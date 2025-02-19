export interface UserUpdateRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  oldPassword: string;
  newPassword: string;
}
