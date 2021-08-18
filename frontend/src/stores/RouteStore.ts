import { action, makeObservable, observable } from 'mobx';
import RouteSheetsModel from '@/model/RouteSheetsModel';

export default class RouteStore {
  @observable routes: any[] | null = null;

  @observable selectedRoutes: any[] = [];

  @observable startTime: string | null = null;

  @observable routeSheet: RouteSheetsModel = new RouteSheetsModel()

  constructor() {
    makeObservable(this);
  }

  @action setRoutes = (routes: any[]) => {
    this.routes = routes;
  };

  @action setTime = (time: string) => {
    this.startTime = time;
    this.updateTime();
  };
  
  @action updateTime = () => {
    if (!this.startTime) return null;
    this.selectedRoutes = this.selectedRoutes.reduce((acc, cur, index, array) => {
      if (index === 0) {
        cur.plainTime = this.routeSheet.getTime(this.startTime,
          this.routeSheet.getDistanceFromPoints(this.routeSheet.getById(cur.startId), this.routeSheet.getById(cur.endId)));
      } else {
        cur.plainTime = this.routeSheet.getTime(acc[acc.length - 1].plainTime,
          this.routeSheet.getDistanceFromPoints(this.routeSheet.getById(cur.startId), this.routeSheet.getById(cur.endId)));
      }
      acc.push(cur);
      return acc;
    }, []);
  }

  @action addRoute = (route: any) => {
    // Равна текущей точке
    const index = this.selectedRoutes.findIndex(el => el.startId === route.startId && el.endId === route.endId);
    if (index === -1) {
      this.selectedRoutes.push(route);
    } else {
      this.selectedRoutes[index] = route;
    }
    this.updateTime();
  }

  getPair = (startId, endId) => {
    const a = this.selectedRoutes.find(el => el.startId === startId && el.endId === endId);
    return a;
  }

  @action setPoints = (points) => {
    this.routeSheet = new RouteSheetsModel({ points });
    this.selectedRoutes = this.routeSheet.getPair()?.map((el, index) => {
      return {
        startId: el[0].id,
        endId: el[1].id,
      };
    });
    this.updateTime();
  }
}
