import { action, makeObservable, observable } from 'mobx';
import UserModel from '@/model/UserModel';

export default class UserListStore {
  @observable users: any[] | null = null;

  @observable couriersList : any = [];

  constructor() {
    makeObservable(this);
  }

  @action setUsers = (users: any[]) => {
    this.users = users;
  };

  @action addUser = (user: any) => {
    if (!this.users) {
      this.users = [user];
      return;
    }
    this.users.unshift(user);
  }

  @action setCourier(list) {
    this.couriersList = list;
  }
}
