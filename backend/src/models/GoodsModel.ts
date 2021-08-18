export default class GoodsModel {
    id: number;

    name: string;

    requirements: string;

    count: number;

    weight: number;

    volume: number;

    constructor(obj: GoodsModel) {
      this.id = obj.id;
      this.name = obj.name;
      this.requirements = obj.requirements;
      this.count = obj.count;
      this.weight = obj.weight;
      this.volume = obj.volume;
    }
}
