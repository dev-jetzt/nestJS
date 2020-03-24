import { PassportStrategy } from '@nestjs/passport';
import * as BearerStrategy from 'passport-http-bearer';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../usermodule/dto/user.dto';

@Injectable()
export class TokenStrategy extends PassportStrategy(BearerStrategy, 'token') {

    constructor(private authService: AuthService) {
        super();
    }

    async validate(token: string): Promise<UserDto> {

        const user = await this.authService.validateToken(token);

        if (!user) {
            throw new ForbiddenException();
        }

        return UserDto.createFromEntity(user);
    }
}