import moment from 'moment';

export default class RouteSheetsModel {
  points: [];

  SPEED: 80;

  constructor(model?: RouteSheetsModel) {
    this.points = model?.points || [];
  }

  getPair() {
    const pairArray = [];
    if (this.points.length) {
      this.points?.reduce((prev, el) => {
        pairArray.push([prev, el]);
        return el;
      });
    }
    return pairArray;
  }

  getById(id: number) {
    return this.points.find(el => el.id === id);
  }

  getDistanceFromPoints(point1, point2) {
    return Math.floor(RouteSheetsModel.getDistanceFromLatLonInKm(point1.x, point1.y, point2.x, point2.y));
  }

  getTime(time, distance: number) {
    if (!time) return time;

    const mom = moment(time, 'YYYY-MM-DD');
    const min = (distance / 80) * 60 * 60;
    mom.add(min, 'minutes');
    const date = mom.format('YYYY-MM-DD hh:mm');
    return date;
  }

  static getDistanceFromLatLonInKm(x1: number, y1: number, x2: number, y2: number) {
    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(x2 - x1); // deg2rad below
    const dLon = deg2rad(y2 - y1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos(deg2rad(x1)) * Math.cos(deg2rad(x2))
      * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  deletePoint(point) {
    this.points = this.points.filter(el => el.id !== point.id);
  }
}
