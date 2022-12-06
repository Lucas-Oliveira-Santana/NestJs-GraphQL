import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.userService.findAllUsers();

    return users;
  }

  @Query(() => User)
  async userByID(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findUserById(id);

    return user;
  }

  @Query(() => User)
  async userByEmail(@Args('email') email: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);

    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.userService.createUser(data);

    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    const user = await this.userService.deleteUser(id);

    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    const userUpdated = await this.userService.updateUser(id, data);

    return userUpdated;
  }
}
