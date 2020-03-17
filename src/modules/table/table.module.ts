import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchRepository } from '../match/match.repository';
import { TableController } from './table.controller';
import { TableService } from './table.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MatchRepository]),
    ],
    controllers: [
        TableController,
    ],
    providers: [
        TableService,
    ],
})
export class TableModule {

}