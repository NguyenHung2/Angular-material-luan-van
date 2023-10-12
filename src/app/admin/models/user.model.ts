export class User {
  userId: number;
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  dob: string;
  avatar: string;
  role: string;

  constructor(
    userId: number,
    name: string,
    username: string,
    email: string,
    password: string,
    phone: string,
    gender: string,
    dob: string,
    avatar: string,
    role: string
  ) {
    this.userId = userId;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.gender = gender;
    this.dob = dob;
    this.avatar = avatar;
    this.role = role;
  }
}
