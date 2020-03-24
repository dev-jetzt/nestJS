import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../usermodule/user.entity';
import {v4 as uuid} from 'uuid';
import { UserRequestDto } from './dto/userRequestDto';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userDto: UserRequestDto): Promise<UserDto> {
    const newUser = User.creaetFromDto(userDto);
    const savedUser = await this.userRepository.save(newUser);
    return UserDto.createFromEntity(savedUser);
  }

  async login(username: string, password: string): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: { username },
    });

    if (!foundUser || foundUser.password !== password) {
      throw new UnauthorizedException();
    }

    foundUser.token = uuid();
    return this.userRepository.save(foundUser);
  }

  async findByToken(token: string): Promise<User | undefined> {
    return this.userRepository.findOne({where: { token }});
  }
}