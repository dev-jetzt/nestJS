import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/db.module';
import { MatchModule } from './modules/match/match.module';
import { TableModule } from './modules/table/table.module';

@Module({
  imports: [
    DatabaseModule,
    MatchModule,
    TableModule,
  ],
})
export class AppModule { }
