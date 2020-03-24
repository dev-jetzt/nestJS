import { User } from '../user.entity';

export class LoginResponseDto {
    public token: string;

    public static createFromEntity(user: User): LoginResponseDto {
        const dto = new LoginResponseDto();
        dto.token = user.token;
        return dto;
    }
}