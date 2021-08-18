import bcrypt from 'bcrypt';
import { Points, User } from '../models/DbModel';
import db from '../config/db';
import BaseService from './BaseService';
import { ServerError } from '../middleware/errorHandler';
import Users from '../models/Users';

class UserService extends BaseService {
  async create(user: Users) {
    const hashPassword = await this.getPassword(user.password);
    const answer = await User.create({ ...user, password: hashPassword }, {
      include: {
        model: Points,
        as: Points.name
      }
    });
    return new Users(answer);
  }

  async loginUser(user) {
    const dbUser = await User.findOne({ where: { email: user.email } });
    if (!dbUser) return null;

    return await this.checkPassword(String(user.password), dbUser.password) ? dbUser : null;
  }

  getPassword = async (password) => await bcrypt.hash(password, 5)

  checkPassword = async (password, passwordHash) => await bcrypt.compare(password, passwordHash)

  async getAll() {
    return await User.findAll({
      include: [{
        model: Points,
        as: Points.name,
      }]
    });
  }

  async getByRole(role: string) {
    console.log(role);
    return await User.findAll({
      where: {
        role
      },
      include: [{
        model: Points,
        as: Points.name,
      }]
    });
  }

  async getOne(id: number) {
    const user = await User.findOne({ where: { id: Number(id) }, include: { model: Points, as: Points.name } });
    if (user) return user;
    throw new ServerError(401, 'Неавторизованный пользователь');
  }
}

export default new UserService();
