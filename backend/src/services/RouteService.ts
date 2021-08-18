import {Application, Route, RouteSheet} from '../models/DbModel';
import db from "../config/db";
import moment from "moment";

class RouteService {
  async getAll() {
    return await Route.findAll();
  }

  async getOne(id: number) {
    return await Route.findOne({ where: { id }});
  }

  async update(route) {
    return await Route.update(route, { where: { id: route.id } });
  }

  async done(id: number) {
    const curdate = new Date();
    const route = await Route.update({ status: "DONE", fact_date_to: curdate }, { where: { id } });
    await Application.update({ current_status: "INDESTINATION", arrival_date: curdate }, { where: { route_id: id } });
    await db.query("update routes " +
        " set fact_date_from = '" + moment(curdate).format("YYYY-MM-DD hh:mm:ss") + "' " +
        " where id = " +
        " (select id from routes as rr " +
        " join " +
        "   (select min(rl.order) as order, min(rl.route_sheets_id) as route_sheets_id " +
        "   from routes as r " +
        "   join routes as rl on rl.route_sheets_id = r.route_sheets_id and rl.id <> r.id and rl.status <> 'DONE' " +
        "   where r.id = " + id + " " +
        "   ) as ri on ri.order = rr.order and ri.route_sheets_id = rr.route_sheets_id " +
        " )");
    await db.query("update route_sheets set status = 'DONE' where id = (select route_sheets_id from routes where id = " + id + ") " +
        " and (select count(r.*) from routes as r inner join routes as s on s.route_sheets_id = r.route_sheets_id and s.id = " + id + " where r.status <> 'DONE') = 0");
    return route;
  }


}
export default new RouteService();
