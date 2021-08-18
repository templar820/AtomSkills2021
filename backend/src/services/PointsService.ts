import { Points } from '../models/DbModel';

class PointsService {
  async create(point: Points) {
    return await Points.create(point);
  }

  async getAll() {
    return await Points.findAll();
  }

  async getOne(id: number) {
    return await Points.findOne({ where: { id } });
  }
}
export default new PointsService();
