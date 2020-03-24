import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './user.service';
import { UserRequestDto } from './dto/userRequestDto';

@Controller('/api/user')
export class UserController {

    constructor(
        private readonly userService: UsersService,
    ) {}

    @Post('/')
    public async createUser(
        @Body() createUserDto: UserRequestDto,
    ): Promise<UserDto> {
        return this.userService.createUser(createUserDto);
    }

}