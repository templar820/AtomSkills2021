import NetworkService from "@/services/NetworkService";
import ResponsibleStore from "@/stores/ResponsibleStore";

export default class ResponsibleService {
  private networkService: NetworkService;
  private responsibleStore: ResponsibleStore;

  constructor(networkService: NetworkService, organizationStore: ResponsibleStore) {
    this.networkService = networkService;
    this.responsibleStore = organizationStore;
  }

  async getResponsiblesByOrgId(orgId: string, field: 'senders' | 'recipients') {
    const { data } = await this.networkService.fetch({alias: `organisations/responsibles/${orgId}`, type: 'GET'});
    console.log(data);
    this.responsibleStore.setResponsibles(data.responsible, field);
  }

  async createResponsible(responsible: any, field: 'senders' | 'recipients') {
    console.log(responsible);
    const { data } = await this.networkService.fetch({alias: 'responsibles', parameters: responsible});
    this.responsibleStore.addResponsibles(data, field);
  }
}
