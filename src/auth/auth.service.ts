import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthInput } from './dtos/auth.input';
import { AuthType } from './dtos/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.findUserByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('User or Password incorrect');
    }

    const validPassword = compareSync(data.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('User or Password incorrect');
    }

    const token = await this.jwtToken(user);

    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { username: user.name, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
