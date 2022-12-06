import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'e6de02f8-bc0f-454d-b290-2a2702569ff2',
        signOptions: {
          expiresIn: '30s',
        },
      }),
    }),
  ],
  providers: [AuthService, AuthResolver, UserService, JwtStrategy],
})
export class AuthModule {}
