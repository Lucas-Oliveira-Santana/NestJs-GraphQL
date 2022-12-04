import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'lucasoliveira',
      password: 'brainny123',
      database: 'nest_api',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: (process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
