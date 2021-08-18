export default class PointsModel {
  id: number;

  address: string;

  name: string;

  y: number;

  x: number;

  constructor(obj: PointsModel) {
    this.id = obj.id;
    this.x = obj.x;
    this.y = obj.y;
    this.address = obj.address;
    this.name = obj.name;
  }
}
