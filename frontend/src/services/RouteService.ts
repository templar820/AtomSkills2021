import NetworkService from '@/services/NetworkService';
import RouteStore from '@/stores/RouteStore';

export default class RouteService {
  private networkService: NetworkService;

  private routeStore: RouteStore;

  constructor(networkService: NetworkService, routeStore: RouteStore) {
    this.networkService = networkService;
    this.routeStore = routeStore;
  }

  async getRoutes(status: string) {
    const { data } = await this.networkService.fetch({
      alias: 'sheets/filter',
      parameters: {
        status
      }
    });
    this.routeStore.setRoutes(data);
  }

  async getCourierRoutes(id: number) {
    const { data } = await this.networkService.fetch({ alias: `sheets/bycourier/${id}`, type: 'GET' });
    this.routeStore.setRoutes(data);
  }

  async getRoute(id: number) {
    const { data } = await this.networkService.fetch({ alias: `sheets/${id}`, type: 'GET' });
    return data;
  }

  async createRoute(route: any) {
    console.log('111111111111', route);
    const { data } = await this.networkService.fetch({ alias: 'sheets', parameters: route });
  }

  async changeStatus(route, status: string) {
    const { data } = await this.networkService.fetch({ alias: 'applications', parameters: { ...route, current_status: status }, type: 'PATCH' });
    return data;
  }

  async createRoutSheet() {
    const routes = this.routeStore.selectedRoutes.map((el, index, array) => {
      return {
        status: 'NEW',
        order: index,
        plan_date_from: index === 0 ? this.routeStore.startTime : array[index - 1].plainTime,
        plan_date_to: el.plainTime,
        point_from_id: el.startId,
        point_to_id: el.endId,
        applications: el.applications
      };
    });
    const { data } = await this.networkService.fetch({
      alias: 'sheets',
      parameters: {
        status: 'NEW',
        courier_id: null,
        routes,
      }
    });
    return data;
  }

  async updateSheet(sheet) {
    const { data } = await this.networkService.fetch({ alias: 'sheets', parameters: sheet, type: 'PATCH' });
  }

  async routeDone(id: number) {
    const { data } = await this.networkService.fetch({ alias: `routes/done/${id}`, type: 'PATCH' });
    return data;
  }

  async setCourier(body) {
    const { data } = await this.networkService.fetch({ alias: 'sheets/setcourier', parameters: body, type: 'POST' });
    window.location.reload();
    return data;
  }
}
