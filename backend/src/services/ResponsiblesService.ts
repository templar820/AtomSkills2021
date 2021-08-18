import { Responsible, Organisations } from '../models/DbModel';

class OrganisationsService {
  async create(responsible) {
    return await Responsible.create(responsible);
  }

  async getAll() {
    return await Responsible.findAll();
  }

  async getOne(id: number) {
    return await Responsible.findOne({ where: { id }, include: { model: Organisations, as: Organisations.name } });
  }

  async update(responsible) {
    return await Responsible.update(responsible, { where: { id: responsible.id } });
  }
}
export default new OrganisationsService();
