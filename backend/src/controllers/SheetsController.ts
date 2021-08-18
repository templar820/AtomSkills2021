import {
  Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import { ServerError } from '../middleware/errorHandler';
import SheetsModel from '../models/SheetsModel';
import SheetService from '../services/SheetService';
import ApplicationsController from './ApplicationsController';
import ApplicationsService from '../services/ApplicationsService';

interface Filter {
  status: string
}

interface SheetsCourierModel
{
  route_sheets_id: number,
  courier_id: number
}

@Route('/sheets')
@Tags('SheetsModel')
@Security('api_key')
class SheetsController extends Controller {
  constructor() {
    super();
    autoBind(this);
  }

  @Post()
  public async create(@Body() body: SheetsModel): Promise<SheetsModel> {
    const sheet = await SheetService.create(body);
    const routesForSheet = await SheetService.getOne(sheet.id);
    for await (const route of body.routes) {
      for await (const application of route.applications) {
        console.log(route.id);
        await ApplicationsService.update({
          current_status: 'INROUTE',
          id: application.id,
          route_id: routesForSheet.routes.find(el => el.order === route.order).id
        });
      }
    }
    return routesForSheet;
  }

  @Post()
  public async setCourier(@Body() body: SheetsCourierModel): Promise<SheetsModel> {
    return await SheetService.setCourier(body);
  }

  @Post('/filter')
  public async filter(@Body() body: Filter): Promise<SheetsModel[]> {
    const routes = await SheetService.filter(body.status);
    return routes;
  }

  @Patch()
  public async update(@Body() body: SheetsModel): Promise<SheetsModel> {
    const route = await SheetService.update(body);
    return route;
  }

  //
  @Get('{id}')
  public async getById(id : number): Promise<SheetsModel> {
    const route = await SheetService.getOne(id);
    return route;
  }

  @Get('/bycourier/{id}')
  public async getByCourier(id : number): Promise<SheetsModel> {
    const routes = await SheetService.getByCourier(id);
    return routes;
  }

  //
  // @Delete('{id}')
  // public async delete(id : number): Promise<ResponsiblesModel> {
  //   const responsibles = new ResponsiblesModel(await ResponsiblesService.getOne(id));
  //   responsibles.disabled = true;
  //   const answer = await ResponsiblesService.update(responsibles);
  //   return answer ? true : new ServerError(500, 'Не удалили организации');
  // }
}

export default new SheetsController();
