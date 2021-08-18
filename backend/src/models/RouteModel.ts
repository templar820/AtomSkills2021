export default class RouteModel {
  id: number;

  status: string;

  order: number;

  plan_date_from: string;

  fact_date_from: string;

  plan_date_to: string;

  fact_date_to: string;

  point_from_id: number;

  point_to_id: number;

  constructor(model: RouteModel) {
    this.id = model.id;
    this.status = model.status;
    this.order = model.order;
    this.plan_date_from = model.plan_date_from;
    this.fact_date_from = model.fact_date_from;
    this.plan_date_to = model.plan_date_to;
    this.fact_date_to = model.fact_date_to;
    this.point_from_id = model.point_from_id;
    this.point_to_id = model.point_to_id;
  }
}
