import RouteModel from './RouteModel';

export default class SheetsModel {
  id: number;

  status: string;

  courier_id: number;

  routes: RouteModel[]

  constructor(model: SheetsModel) {
    this.id = model.id;
    this.status = model.status;
    this.courier_id = model.courier_id;
    this.routes = model.routes;
  }
}
