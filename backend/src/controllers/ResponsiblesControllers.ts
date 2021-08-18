import {
  Body, Controller, Get, Post, Route, Header, Tags, Security, Delete
} from 'tsoa';
import { ServerError } from '../middleware/errorHandler';
import ResponsiblesModel from '../models/ResponsiblesModel';
import ResponsiblesService from '../services/ResponsiblesService';

@Route('/responsibles')
@Tags('ResponsiblesModel')
@Security('api_key')
class ResponsiblesController extends Controller {
  @Post()
  public async create(@Body() body: ResponsiblesModel): Promise<ResponsiblesModel> {
    const organisation = await ResponsiblesService.create(body);
    return organisation;
  }

  @Get()
  public async getAll(): Promise<ResponsiblesModel> {
    const organisation = await ResponsiblesService.getAll();
    return organisation;
  }

  @Get('{id}')
  public async getOne(id : number): Promise<ResponsiblesModel> {
    const organisation = await ResponsiblesService.getOne(id);
    return organisation;
  }

  @Delete('{id}')
  public async delete(id : number): Promise<ResponsiblesModel> {
    const responsibles = new ResponsiblesModel(await ResponsiblesService.getOne(id));
    responsibles.disabled = true;
    const answer = await ResponsiblesService.update(responsibles);
    return answer ? true : new ServerError(500, 'Не удалили организации');
  }
}

export default new ResponsiblesController();
