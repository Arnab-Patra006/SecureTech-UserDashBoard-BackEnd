import { UserRole } from "../entities/UserRole";

export interface UserI {
  username: string;
  password: string;
  email: string;
  role: UserRole;
}
