import { User } from '../user.entity';
import { USER_ROLE } from '../user.roles';

export class UserDto {
    public name: string;
    public role: USER_ROLE;

    public static createFromEntity(user: User): UserDto {
        const dto = new UserDto();
        dto.name = user.username;
        dto.role = user.role;
        return dto;
    }
}