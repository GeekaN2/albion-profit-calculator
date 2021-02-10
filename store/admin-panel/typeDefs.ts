/**
 * Admin panel state
 */
export interface AdminPanelState {
  roles: string[];
  users: User[];
}

/**
 * User model
 */
export interface User {
  nickname: string;
  role: string;
  resetPassword: boolean;
}