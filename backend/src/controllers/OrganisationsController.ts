import {
  Body, Controller, Get, Post, Route, Tags, Security, Delete
} from 'tsoa';
import { ServerError } from '../middleware/errorHandler';
import OrganisationsModel from '../models/OrganisationsModel';
import OrganisationsService from '../services/OrganisationsService';

@Route('/organisations')
@Tags('OrganisationsModel')
@Security('api_key')
class OrganisationsController extends Controller {
  @Post()
  public async create(@Body() body: OrganisationsModel): Promise<OrganisationsModel> {
    const organisation = await OrganisationsService.create(body);
    return organisation;
  }

  @Get()
  public async getAll(): Promise<OrganisationsModel> {
    const organisation = await OrganisationsService.getAll();
    return organisation;
  }

  @Get('{id}')
  public async getOne(id : number): Promise<OrganisationsModel> {
    const organisation = await OrganisationsService.getOne(id);
    return organisation;
  }
  
  @Get('/responsibles/{id}')
  public async getWithResponsibles(id : number): Promise<OrganisationsModel> {
    const organisation = await OrganisationsService.getWithResponsibles(id);
    return organisation;
  }

  @Delete('{id}')
  public async delete(id : number): Promise<OrganisationsModel> {
    const organisation = new OrganisationsModel(await OrganisationsService.getOne(id));
    organisation.disabled = true;
    const answer = await OrganisationsService.update(organisation);
    return answer ? true : new ServerError(500, 'Не удалили организации');
  }
}

export default new OrganisationsController();
