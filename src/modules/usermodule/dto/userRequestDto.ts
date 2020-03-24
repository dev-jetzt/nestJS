import { IsDefined, IsString, Min } from 'class-validator';

export class UserRequestDto {

    @IsDefined()
    @IsString()
    public username: string;

    @IsDefined()
    @IsString()
    @Min(6)
    public password: string;
}