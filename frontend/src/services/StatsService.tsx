import NetworkService from "@/services/NetworkService";

export default class StatsService {
  private networkService: NetworkService;

  constructor(networkService: NetworkService) {
    this.networkService = networkService;
  }

  async getPriceStats(period: 'year' | 'month' | 'day') {
    const { data } = await this.networkService.fetch({alias: `stats/prices/${period}`, type: 'GET'});
    return data;
  }

  async getVolumeStats(period: 'year' | 'month' | 'day') {
    const { data } = await this.networkService.fetch({alias: `stats/volumes/${period}`, type: 'GET'});
    return data;
  }
}
