import { AuthProvider } from "../enums/authProvider.enum";
import { Gender } from "../enums/gender.enum";
import { Role } from "../enums/role.enum";

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  role: Role;
  gender: Gender;
  authProvider: AuthProvider;
  loggedAt: Date;
  createdAt: Date;
}

export type UserJson = {
  [Property in keyof User]: string;
};
