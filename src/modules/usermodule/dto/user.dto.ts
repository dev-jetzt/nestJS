import { User } from '../user.entity';

export class UserDto {
    public name: string;

    public static createFromEntity(user: User): UserDto {
        const dto = new UserDto();
        dto.name = user.username;
        return dto;
    }
}