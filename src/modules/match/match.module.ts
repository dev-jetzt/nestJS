import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchRepository } from './match.repository';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([MatchRepository]),
        PassportModule,
    ],
    controllers: [
        MatchController,
    ],
    providers: [
        MatchService,
    ],
})
export class MatchModule { }