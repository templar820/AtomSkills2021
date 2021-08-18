import {
  Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import { ServerError } from '../middleware/errorHandler';
import es from '../config/es';
import ApplicationsModel from '../models/ApplicationsModel';
import ApplicationsService from '../services/ApplicationsService';

interface ListArea {
  offset: number;
  limit: number;
}

export interface FilterAreaEnd {
  current_status: string;
  point_to_id: number;
}

export interface FilterAreaStart {
  current_status: string;
  point_from_id: number;
}

export interface FilterAreaFull extends FilterAreaEnd, FilterAreaStart{}

interface SearchArea extends ListArea {
  query: string;
}

interface IAppRoute {
  applicationId: number[],
  route: number
}

@Route('/applications')
@Tags('ApplicationsModel')
@Security('api_key')
class ApplicationsController extends Controller {
  constructor() {
    super();
    autoBind(this);
  }

  // @Post('/part')
  // public async getPart(@Body() body: ): Promise<{ applications: ApplicationsModel[], count: number }> {
  //   // const products = await ProductService.getPart(body.offset, body.limit);
  //   // const count = await ProductService.getCount();
  //   // return { products, count };
  // }

  @Post('/filter/start')
  public async getFilterFrom(@Body() body: FilterAreaStart): Promise<ApplicationsModel[]> {
    const app = await ApplicationsService.getFilterFrom(body);
    return app;
  }
  
  @Post('/filter/end')
  public async getFilterTo(@Body() body: FilterAreaEnd): Promise<ApplicationsModel[]> {
    const app = await ApplicationsService.getFilterTo(body);
    return app;
  }
  
  @Post('/filter/full')
  public async getFilterFull(@Body() body: FilterAreaFull): Promise<ApplicationsModel[]> {
    const app = await ApplicationsService.getFilterFull(body);
    return app;
  }

  @Get('{id}')
  public async getById(id: number) : Promise<ApplicationsModel> {
    const app = await ApplicationsService.getById(id);
    if (!app) throw new ServerError(500, 'Сущность не найдена');
    return app;
  }

  @Post()
  public async insert(@Body() body: ApplicationsModel): Promise<ApplicationsModel> {
    const app = await ApplicationsService.create(body);
    return this.getById(app.id);
  }

  @Patch('/route')
  public async update(@Body() body: IAppRoute): Promise<ApplicationsModel[]> {
    for await (const id of body.applicationId) {
      const application = await this.getById(id) as ApplicationsModel;
      application.route_id = body.route;
      application.current_status = 'INROUTE';
      await ApplicationsService.update(application);
    }
  }

  // @Patch('/indestination')
  // public async update(@Body() body: IAppRoute): Promise<ApplicationsModel[]> {
  //   for await (const id of body.applicationId) {
  //     const application = await this.getById(id) as ApplicationsModel;
  //     application.route_id = body.route;
  //     application.current_status = ' INDESTINATION';
  //     await ApplicationsService.update(application);
  //   }
  // }

  // @Patch('/return')
  // public async update(@Body() body: IAppRoute): Promise<ApplicationsModel[]> {
  //   for await (const id of body.applicationId) {
  //     const application = await this.getById(id) as ApplicationsModel;
  //     application.route_id = body.route;
  //     application.current_status = 'RETURN';
  //     await ApplicationsService.update(application);
  //   }
  // }

  // @Patch('/delivered')
  // public async update(@Body() body: IAppRoute): Promise<ApplicationsModel[]> {
  //   for await (const id of body.applicationId) {
  //     const application = await this.getById(id) as ApplicationsModel;
  //     application.route_id = body.route;
  //     application.current_status = 'DELIVERED';
  //     await ApplicationsService.update(application);
  //   }
  // }
  //
  @Patch()
  public async update(@Body() body: ApplicationsModel): Promise<ApplicationsModel[]> {
    await ApplicationsService.update(body);
    return await this.getById(body.id)
  }

  // @Delete('{id}')
  // public async delete(id: string): Promise<boolean> {
  //   await ProductService.deleteById(Number(id));
  //   return true;
  // }

  @Post('/search')
  public async search(@Body() body: SearchArea): Promise<{ products: ApplicationsModel[], count: number }> {
    const esCount = await es.count({
      index: 'products',
      type: 'products',
      q: `*${body.query}*`,
    });
    const result = await es.search({
      index: 'products',
      type: 'products',
      q: `*${body.query}*`,
      from: Number(body.offset) ? Number(body.offset) : 0,
      size: Number(body.limit) ? Number(body.limit) : Number(esCount.body.count),
    });
    // return Promise.resolve({
    //   products: await Promise.all(result.body.hits.hits.map(async (el) => await ApplicationsModel.getById(el._id))),
    //   count: esCount.body.count,
    // });
  }

  @Patch('/return/{id}')
  public async applReturn(id: number) : Promise<ApplicationsModel> {
    return ApplicationsService.applReturn(id);
  }
}

export default new ApplicationsController();
