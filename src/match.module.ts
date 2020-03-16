import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { MatchRepository } from './repository/match.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'devjetzt',
      entities: ['src/**/*.entity.ts'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([MatchRepository]),
  ],
  controllers: [
    MatchController,
    TableController,
  ],
  providers: [
    MatchService,
    TableService,
  ],
})
export class MatchModule implements OnModuleDestroy, OnModuleInit {

  constructor(private readonly connection: Connection) {}

  async onModuleInit() {
    await this.connection.synchronize(true);
  }

  async onModuleDestroy() {
    await this.connection.close();
  }

}
