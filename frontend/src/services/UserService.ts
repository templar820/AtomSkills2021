import NetworkService from '@/services/NetworkService';
import UserListStore from '@/stores/UserListStore';

export default class UserService {
  private networkService: NetworkService;

  private userListStore: UserListStore;

  constructor(networkService: NetworkService, userListStore: UserListStore) {
    this.networkService = networkService;
    this.userListStore = userListStore;
  }

  async getUsers() {
    const { data } = await this.networkService.fetch({ alias: 'user', type: 'GET' });
    console.log(data);
    this.userListStore.setUsers(data);
  }

  async createUser(user: any) {
    const { data } = await this.networkService.fetch({ alias: 'user', parameters: user });
    this.userListStore.addUser(data);
  }

  async getCouriers() {
    const { data } = await this.networkService.fetch({ alias: 'user/role/COURIER', type: 'GET' });
    this.userListStore.setCourier(data);
  }
}
