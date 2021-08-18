import {
  Body, Controller, Get, Post, Route, Header, Tags, Security
} from 'tsoa';
import { ServerError } from '../middleware/errorHandler';
import PointsModel from '../models/PointsModel';
import PointsService from '../services/PointsService';

@Route('/points')
@Tags('PointsModel')
@Security('api_key')
class PointsController extends Controller {
  @Get()
  public async getAll(): Promise<PointsModel[]> {
    const points = await PointsService.getAll();
    return points;
  }

  @Get('{id}')
  public async getById(id: number): Promise<PointsModel> {
    const point = await PointsService.getOne(id);
    return point;
  }
}

export default new PointsController();
