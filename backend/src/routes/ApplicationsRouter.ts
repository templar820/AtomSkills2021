import { Request } from 'express';
import ApplicationsController from '../controllers/ApplicationsController';
import BaseRouter, { requestType } from './BaseRouter';
import IoModel from '../socket/IoModel';

class ApplicationsRouter extends BaseRouter {
  constructor() {
    super();
    this.createHandleWithBody(requestType.POST, '/applications/filter/start', ApplicationsController.getFilterFrom);
    this.createHandleWithBody(requestType.POST, '/applications/filter/end', ApplicationsController.getFilterTo);
    this.createHandleWithBody(requestType.POST, '/applications/filter/full', ApplicationsController.getFilterFull);
    this.createHandleWithBody(requestType.PATCH, '/applications', ApplicationsController.update);
    this.createHandleWithBody(requestType.POST, '/applications', ApplicationsController.insert);
    this.createHandleWithParams(requestType.GET, '/applications/:id', ApplicationsController.getById, { params: 'id' });
    // this.createHandleWithParams(requestType.DELETE, '/applications/:id', ApplicationsController.delete, {
    //   params: 'id',
    //   access: ['ADMIN'],
    //   callback: this.deleteCallback
    // });
    this.createHandleWithBody(requestType.POST, '/applications/search', ApplicationsController.search);
    this.createHandleWithParams(requestType.PATCH, '/applications/return/:id', ApplicationsController.applReturn, { params: 'id' });
  }

  deleteCallback(answer: any, req: Request, res: Response): boolean {
    const io = res.io as IoModel;
    io.sendInSession(req.user.email, 'connection', 'CURRENT');
    io.sendToUsers('connection', `FROM ${req.user.email}`, ['cypress@test']);
    io.sendAll('connection', 'ALL');
    return true;
  }
}

export default new ApplicationsRouter().router;
