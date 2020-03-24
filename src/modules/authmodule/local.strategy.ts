
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, ImATeapotException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'modules/usermodule/dto/user.dto';
import { LoginResponseDto } from 'modules/usermodule/dto/loginResponseDto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<LoginResponseDto> {

    const loginResponse = await this.authService.validateUser(username, password);

    if (!loginResponse) {
      throw new UnauthorizedException();
    }

    return loginResponse;
  }
}