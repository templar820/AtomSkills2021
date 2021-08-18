export default class ResponsiblesModel {
    id: number;

    FIO: string;

    phone: string;

    email : string;

    organisations_id: number;
    
    disabled: boolean;

    constructor(obj: ResponsiblesModel) {
      this.id = obj.id;
      this.FIO = obj.FIO;
      this.phone = obj.phone;
      this.email = obj.email;
      this.organisations_id = obj.organisations_id;
      this.disabled = obj.disabled;
    }
}
