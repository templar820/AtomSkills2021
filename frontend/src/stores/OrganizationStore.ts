import { action, makeObservable, observable } from 'mobx';

export default class OrganizationStore {
  @observable organizations: any[] | null = null;

  constructor() {
    makeObservable(this);
  }

  @action setOrganizations = (organizations: any[]) => {
    this.organizations = organizations;
  };

  @action addOrganization = (organization: any) => {
    if (!this.organizations) {
      this.organizations = organization;
      return;
    }
    this.organizations.unshift(organization);
  }
};
