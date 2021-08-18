import NetworkService from "@/services/NetworkService";
import OrganizationStore from "@/stores/OrganizationStore";

export default class OrganizationService {
  private networkService: NetworkService;
  private organizationStore: OrganizationStore;

  constructor(networkService: NetworkService, organizationStore: OrganizationStore) {
    this.networkService = networkService;
    this.organizationStore = organizationStore;
  }

  async getOrganizations() {
    const { data } = await this.networkService.fetch({alias: 'organisations', type: 'GET'});
    console.log(data);
    this.organizationStore.setOrganizations(data);
  }

  async createOrganization(organization: any) {
    console.log(organization);
    const { data } = await this.networkService.fetch({alias: 'organisations', parameters: organization});
    this.organizationStore.addOrganization(data);
  }
}
