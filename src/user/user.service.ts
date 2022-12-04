import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    const users = await this.UserRepository.find();

    return users;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.UserRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const user = this.UserRepository.create(data);

    const userSaved = await this.UserRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException('Problem with user creation');
    }

    return userSaved;
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.findUserById(id);

    await this.UserRepository.update(user, { ...data });

    const userUpdated = this.UserRepository.create({ ...user, ...data });

    return userUpdated;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findUserById(id);

    const deleted = await this.UserRepository.delete(user);

    if (deleted) {
      return true;
    }

    return false;
  }
}
