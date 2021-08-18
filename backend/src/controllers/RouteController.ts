import {
  Body, Controller, Get, Post, Route, Header, Tags, Security, Delete, Patch
} from 'tsoa';
import autoBind from 'auto-bind';
import { ServerError } from '../middleware/errorHandler';
import RouteModel from '../models/RouteModel';
import SheetService from '../services/SheetService';
import RouteService from '../services/RouteService';

@Route('/routes')
@Tags('RoutesModel')
@Security('api_key')
class RouteController extends Controller {
  constructor() {
    super();
    autoBind(this);
  }

  @Get('{id}')
  public async getById(id : number): Promise<RouteModel> {
    const route = await SheetService.getOne(id);
    return route;
  }

  @Patch()
  public async updateRoute(@Body body: RouteModel): Promise<RouteModel> {
    const route = await RouteService.update(body);
    return route;
  }

  @Patch('/done/{id}')
  public async doneRoute(id : number): Promise<RouteModel> {
    const route = await RouteService.done(id);
    return route;
  }

}

export default new RouteController();
