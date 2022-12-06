import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'e6de02f8-bc0f-454d-b290-2a2702569ff2',
    });
  }

  async validate(payload: { sub: User['id']; name: string }) {
    const user = this.userService.findUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('unauthorized');
    }
    return user;
  }
}
