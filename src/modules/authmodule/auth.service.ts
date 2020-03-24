import { Injectable } from '@nestjs/common';
import { UsersService } from '../usermodule/user.service';
import { LoginResponseDto } from '../usermodule/dto/loginResponseDto';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<LoginResponseDto> {

    const user = await this.usersService.login(username, pass);

    if (user) {
      return LoginResponseDto.createFromEntity(user);
    }
    return null;
  }

  async validateToken(token: string) {
    const user = await this.usersService.findByToken(token);
    if (user) {
      return user;
    }
    return null;
  }
}