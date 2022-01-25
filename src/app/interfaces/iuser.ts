export interface User {
  key: string;
  uid?: string;
  email: string;
  password: string;
  isAdmin: boolean;
  nombre?: string;
  // photoURL?: string;
  // emailVerified: boolean;
}
