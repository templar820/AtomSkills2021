import StatsModel from '../models/StatsModel';
import db from "../config/db";

class StatsService {
  async getAllPrices(period : string) {
    return await db.query("select o.name, date_trunc('" + period + "', a.date)::date as date, sum(a.price) as value "
        + " from applications as a "
        + " inner join organisations as o on o.id = a.sender_id "
        + " group by o.name, date_trunc('" + period + "', a.date)::date");
  }

  async getAllVolumes(period : string) {
    return await db.query("select p.name, date_trunc('" + period + "', a.date)::date as date, sum(g.volume) as value "
        + " from goods as g "
        + " inner join applications as a on a.id = g.application_id "
        + " inner join points as p on p.id = a.point_from_id "
        + " group by p.name, date_trunc('" + period + "', a.date)::date");
  }
}
export default new StatsService();
