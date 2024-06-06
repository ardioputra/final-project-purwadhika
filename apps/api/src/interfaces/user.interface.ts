export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  verified: Boolean;
  referralCode: string;
  name: string;
  gender: string;
  birthDate: Date;
  role:string;
  profilePicture: string;
}
