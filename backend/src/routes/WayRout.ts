import BaseRouter, { requestType } from './BaseRouter';
import SheetsController from '../controllers/SheetsController';
import RouteController from '../controllers/RouteController';
import StatsController from '../controllers/StatsController';

class WayRout extends BaseRouter {
  constructor() {
    super();
    this.createHandleWithBody(requestType.POST, '/sheets', SheetsController.create);
    this.createHandleWithBody(requestType.POST, '/sheets/filter', SheetsController.filter);
    this.createHandleWithBody(requestType.PATCH, '/sheets', SheetsController.update);
    this.createHandleWithBody(requestType.POST, '/sheets/setcourier', SheetsController.setCourier);
    this.createHandleWithParams(requestType.GET, '/sheets/:id', SheetsController.getById, { params: 'id' });
    this.createHandleWithParams(requestType.GET, '/sheets/bycourier/:id', SheetsController.getByCourier, { params: 'id' });

    this.createHandleWithBody(requestType.PATCH, '/routes', RouteController.updateRoute);
    this.createHandleWithParams(requestType.PATCH, '/routes/done/:id', RouteController.doneRoute, { params: 'id' });

    this.createHandleWithParams(requestType.GET, '/stats/prices/:period', StatsController.getAllPrices, { params: 'period' });
    this.createHandleWithParams(requestType.GET, '/stats/volumes/:period', StatsController.getAllVolumes, { params: 'period' });
  }
}

export default new WayRout().router;
