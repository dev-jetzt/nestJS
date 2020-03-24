import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/db.module';
import { MatchModule } from './modules/match/match.module';
import { TableModule } from './modules/table/table.module';
import { UserModule } from './modules/usermodule/user.module';
import { AuthModule } from './modules/authmodule/auth.module';

@Module({
  imports: [
    DatabaseModule,
    MatchModule,
    TableModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule { }
