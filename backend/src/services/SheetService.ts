import {Application, Points, Route, RouteSheet} from '../models/DbModel';
import SheetsModel from '../models/SheetsModel';
import db from "../config/db";

class SheetService {
  async create(sheet: SheetsModel) {
    return await RouteSheet.create({ ...sheet, route_sheets: sheet.routes }, {
      include: [{
        model: Route,
        as: Route.name
      }]
    });
  }

  async getOne(id: number) {
    return await RouteSheet.findOne({
      where: { id },
      include: {
        model: Route,
        as: Route.name,
        include: [{ model: Points, as: 'relation_point_from_id' }, { model: Points, as: 'relation_point_to_id' }, { model: Application, as: Application.name }]
      }
    });
  }

  async filter(status) {
    return await RouteSheet.findAll({
      where: { status },
      include: {
        model: Route,
        as: Route.name,
        include: [{ model: Points, as: 'relation_point_from_id' }, { model: Points, as: 'relation_point_to_id' }]
      }
    });
  }

  async getByCourier(id: number) {
    return await RouteSheet.findAll({
      where: { courier_id: id },
      include: {
        model: Route,
        as: Route.name,
        include: [{ model: Points, as: 'relation_point_from_id' }, { model: Points, as: 'relation_point_to_id' }]
      }
    });
  }

  async update(sheet) {
    return await RouteSheet.update(sheet, { where: { id: sheet.id } });
  }

  async setCourier(body) {
    const sheet = await RouteSheet.update({ courier_id: body.courier_id, status: 'INTRANSIT' }, { where: { id: body.route_sheets_id }});
    await db.query("update routes as u set fact_date_from = now() where route_sheets_id = " + body.route_sheets_id + " and u.order = (select min(r.order) from routes as r where route_sheets_id = " + body.route_sheets_id + ")");
    return sheet
  }
}
export default new SheetService();
