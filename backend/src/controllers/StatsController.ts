import {
  Body, Controller, Get, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import { ServerError } from '../middleware/errorHandler';
import StatsModel from '../models/StatsModel';
import StatsService from "../services/StatsService";

@Route('/stats')
@Tags('StatsModel')
@Security('api_key')
class StatsController extends Controller {
  constructor() {
    super();
    autoBind(this);
  }

  @Get('/prices/{period}')
  public async getAllPrices(period : string): Promise<StatsModel> {
    const answer = await StatsService.getAllPrices(period);
    return answer[0]
  }

  @Get('/volumes/{period}')
  public async getAllVolumes(period : string): Promise<StatsModel> {
    const answer = await StatsService.getAllVolumes(period);
    return answer[0]
  }

}

export default new StatsController();
