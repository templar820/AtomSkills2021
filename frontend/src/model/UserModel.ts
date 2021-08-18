export default class UserModel {
  email: string;
  role: string;

  constructor(obj: any) {
    this.email = obj.email;
    this.role = obj.role;
  }
}