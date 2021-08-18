export default class Users {
    id: number;

    email: string;

    password: string;

    phone: string;

    name: string;

    first_name: string;

    patronymic: string;

    role: string;

    pointId: string;

    constructor(obj: Users) {
      this.id = obj.id;
      this.phone = obj.phone;
      this.email = obj.email;
      this.name = obj.name;
      this.first_name = obj.first_name;
      this.patronymic = obj.patronymic;
      this.role = obj.role;
      this.pointId = obj.pointId;
    }
}
