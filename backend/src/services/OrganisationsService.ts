import { Organisations, Responsible } from '../models/DbModel';

class OrganisationsService {
  async create(organisation) {
    return await Organisations.create(organisation);
  }

  async getAll() {
    return await Organisations.findAll();
  }

  async getWithResponsibles(id) {
    return await Organisations.findOne({ where: { id }, include: { model: Responsible, as: Responsible.name } });
  }

  async getOne(id: number) {
    return await Organisations.findOne({ where: { id } });
  }

  async update(organisation) {
    return await Organisations.update(organisation, { where: { id: organisation.id } });
  }
}
export default new OrganisationsService();
