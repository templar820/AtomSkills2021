import {
  Body, Controller, Get, Post, Route, Header, Tags, Security
} from 'tsoa';
import { ServerError } from '../middleware/errorHandler';
import UserService from '../services/UserService';
import Users from '../models/Users';

interface AuthCred {
 email: string;
 password: string
}

@Route('/user')
@Tags('User')
class UserController extends Controller {
  @Post()
  public async createUser(@Body() body: Users): Promise<Users> {
    const user = await UserService.create(body) as Users;
    return user;
  }

  @Post('/login')
  public async loginUser(@Body() body: AuthCred) : Promise<{ token: string }> {}

  @Get('/userInfo')
  async getUserByToken(@Header('token') token: string): Promise<Users> {
    const user = await UserService.getOne(Number(token));
    if (!user) throw new ServerError(404, 'User not found');
    return user;
  }
  @Get()
  async getAll(): Promise<Users[]> {
    const user = await UserService.getAll();
    if (!user) throw new ServerError(404, 'User not found');
    return user;
  }

  @Get('/role/{role}')
  async getByRole(role: string): Promise<Users[]> {
    const user = await UserService.getByRole(role);
    if (!user) throw new ServerError(404, 'User not found');
    return user;
  }

}

export default new UserController();
