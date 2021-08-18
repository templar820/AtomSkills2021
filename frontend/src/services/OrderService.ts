import NetworkService from '@/services/NetworkService';
import OrderStore from '@/stores/OrderStore';

export default class OrderService {
  private networkService: NetworkService;

  private orderStore: OrderStore;

  constructor(networkService: NetworkService, orderStore: OrderStore) {
    this.networkService = networkService;
    this.orderStore = orderStore;
  }

  async getOrdersFrom(point: number, status) {
    const { data } = await this.networkService.fetch({
      alias: 'applications/filter/start',
      parameters: {
        current_status: status,
        point_from_id: point
      }
    });
    this.orderStore.setOrders(data);
  }

  async getOrdersTo(point: number, status) {
    const { data } = await this.networkService.fetch({
      alias: 'applications/filter/end',
      parameters: {
        current_status: status,
        point_to_id: point
      }
    });
    this.orderStore.setOrders(data);
  }

  async getOrdersFull(point1: number, point2: number, status) {
    const { data } = await this.networkService.fetch({
      alias: 'applications/filter/full',
      parameters: {
        current_status: status,
        point_from_id: point1,
        point_to_id: point2

      }
    });
    this.orderStore.setOrders(data);
  }

  async createOrder(order: any) {
    const { data } = await this.networkService.fetch({ alias: 'applications', parameters: order });
    return data;
  }

  async getById(id: number) {
    const { data } = await this.networkService.fetch({ alias: `applications/${id}`, type: 'GET' });
    return data;
    // this.userListStore.addUser(data);
  }

  async changeStatus(route, status: string) {
    const { data } = await this.networkService.fetch({ alias: 'applications', parameters: { ...route, current_status: status }, type: 'PATCH' });
    // window.location.reload()
    const { orders } = this.orderStore;
    const i = orders.findIndex(el => el.id === data.id);
    this.orderStore.setOrders(orders?.filter(el => el.id !== data.id));
    return data;
  }
}
