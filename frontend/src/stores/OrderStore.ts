import { action, makeObservable, observable } from 'mobx';

export default class OrderStore {
  @observable orders: any[] | null = null;

  constructor() {
    makeObservable(this);
  }

  @action setOrders = (orders: any[]) => {
    this.orders = orders;
  };

  // @action addUser = (user: any) => {
  //   if (!this.users) return;
  //   this.users.unshift(user);
  // }
}

