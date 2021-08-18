import {
  Application, Goods, Organisations, Points, Responsible, Route
} from '../models/DbModel';
import { ServerError } from '../middleware/errorHandler';
import ApplicationsModel from '../models/ApplicationsModel';
import { FilterArea } from '../controllers/ApplicationsController';
import db from "../config/db";
import moment from "moment";
import GoodsModel from "../models/GoodsModel";

class ApplicationsService {
  async create(body: ApplicationsModel) {
    return await Application.create({ ...body, current_status: 'NEW', [Goods.name]: body.goods }, {
      include: {
        model: Goods,
        as: Goods.name
      }
    });
  }

  async update(application) {
    return await Application.update(application, {
      where: {
        id: application.id
      }
    });
  }

  async getFilterTo(filter: FilterArea) {
    return await Application.findAll({
      include: [{
        model: Points,
        as: 'point_to',
      }],
      where: {
        current_status: filter.current_status,
        point_to_id: filter.point_to_id
      }
    });
  }
  
  async getFilterFull(filter: FilterArea) {
    return await Application.findAll({
      include: [{
        model: Points,
        as: 'point_to',
      }],
      where: {
        current_status: filter.current_status,
        point_to_id: filter.point_to_id,
        point_from_id: filter.point_from_id
      }
    });
  }

  async getFilterFrom(filter: FilterArea) {
    return await Application.findAll({
      include: [{
        model: Points,
        as: 'point_to',
      }],
      where: {
        current_status: filter.current_status,
        point_from_id: filter.point_from_id
      }
    });
  }
  
  //
  // async getCount() {
  //   return await Product.count();
  // }

  async getById(id: number) {
    return await Application.findOne({
      where: {
        id
      },
      include: [
        {
          model: Goods,
          as: Goods.name,
        },
        {
          model: Responsible,
          as: 'sender_responsible',
        },
        {
          model: Responsible,
          as: 'recipient_responsible',
        },
        {
          model: Organisations,
          as: 'recipient',
        },
        {
          model: Organisations,
          as: 'sender',
        },
      ],
    });
  }

  async applReturn(id: number) {
    const curdate = new Date();
    const appl0 = await Application.update({ current_status: "RETURN" }, { where: { id } });
    const appl1 = await Application.findOne({
      where: { id },
      include: [
        {
          model: Goods,
          as: Goods.name,
        }
      ],
    });

    const appl2 = await Application.create({ date: new Date(), current_status: "NEW", price: 0.0,
      sender_id: appl1.recipient_id,
      recipient_id: appl1.sender_id,
      point_from_id: appl1.point_to_id,
      point_to_id: appl1.point_from_id,
      senderResponsibleId: appl1.recipientResponsibleId,
      recipientResponsibleId: appl1.senderResponsibleId
    });

    for await (let g of appl1.goods) {
      await Goods.create({
        name: g.name,
        requirements: g.requirements,
        count: g.count,
        weight: g.weight,
        volume: g.volume,
        application_id: appl2.id
      });
    }

    await Application.update({ appl_return_id: appl2.id }, { where: { id } });

    return appl2;
  }

  //
  // async deleteById(id: number) {
  //   return await Product.destroy({
  //     where: { id },
  //     individualHooks: true,
  //   });
  // }
}

export default new ApplicationsService();
