import BaseRouter, { requestType } from './BaseRouter';
import PointsController from '../controllers/PointsController';
import OrganisationsController from '../controllers/OrganisationsController';
import ResponsiblesControllers from '../controllers/ResponsiblesControllers';

class Org_Resp_Point_Router extends BaseRouter {
  constructor() {
    super();
    this.createHandleWithBody(requestType.GET, '/points', PointsController.getAll);
    this.createHandleWithParams(requestType.GET, '/points/:id', PointsController.getById, { params: 'id' });

    this.createHandleWithParams(requestType.GET, '/organisations/:id', OrganisationsController.getOne, { params: 'id' });
    this.createHandleWithBody(requestType.GET, '/organisations', OrganisationsController.getAll);
    this.createHandleWithBody(requestType.POST, '/organisations', OrganisationsController.create);
    this.createHandleWithParams(requestType.GET, '/organisations/responsibles/:id', OrganisationsController.getWithResponsibles, { params: 'id' });
    this.createHandleWithParams(requestType.DELETE, '/organisations/:id', OrganisationsController.delete, { params: 'id' });

    this.createHandleWithParams(requestType.GET, '/responsibles/:id', ResponsiblesControllers.getOne, { params: 'id' });
    this.createHandleWithBody(requestType.GET, '/responsibles', ResponsiblesControllers.getAll);
    this.createHandleWithBody(requestType.POST, '/responsibles', ResponsiblesControllers.create);
    this.createHandleWithParams(requestType.DELETE, '/responsibles/:id', ResponsiblesControllers.delete, { params: 'id' });

    // this.createHandleWithBody(requestType.PATCH, '/applications', ApplicationsController.update);
    // this.createHandleWithBody(requestType.POST, '/applications', ApplicationsController.insert, { access: ['MANAGER'] });
    // this.createHandleWithParams(requestType.GET, '/applications/:id', ApplicationsController.getById, { params: 'id' });
    // this.createHandleWithParams(requestType.DELETE, '/applications/:id', ApplicationsController.delete, {
    //   params: 'id',
    //   access: ['ADMIN'],
    //   callback: this.deleteCallback
    // });
    // this.createHandleWithBody(requestType.POST, '/applications/search', ApplicationsController.search);
  }
}

export default new Org_Resp_Point_Router().router;
