import { IsDefined, IsString, Min, IsEnum } from 'class-validator';
import { USER_ROLE } from '../user.roles';

export class UserRequestDto {

    @IsDefined()
    @IsString()
    public username: string;

    @IsDefined()
    @IsString()
    @Min(6)
    public password: string;

    @IsDefined()
    @IsEnum(USER_ROLE)
    public role: USER_ROLE;
}