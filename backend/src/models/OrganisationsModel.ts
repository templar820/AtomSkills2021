export default class OrganisationsModel {
    id: number;

    name: string;

    inn: number;
    
    disabled: boolean;

    constructor(obj: OrganisationsModel) {
      this.id = obj.id;
      this.name = obj.name;
      this.inn = obj.inn;
      this.disabled = obj.disabled;
    }
}
