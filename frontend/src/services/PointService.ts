import NetworkService from "@/services/NetworkService";
import PointStore from "@/stores/PointStore";

export default class PointService {
  private networkService: NetworkService;
  private pointStore: PointStore;

  constructor(networkService: NetworkService, pointStore: PointStore) {
    this.networkService = networkService;
    this.pointStore = pointStore;
  }

  async getPoints() {
    const { data } = await this.networkService.fetch({alias: 'points', type: 'GET'});
    this.pointStore.setPoints(data)
  }
}

