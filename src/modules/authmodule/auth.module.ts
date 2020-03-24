import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from '../usermodule/user.module';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { TokenStrategy } from './token.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
        LocalStrategy,
        TokenStrategy,
    ],
    exports: [
        AuthService,
    ],
})
export class AuthModule {}