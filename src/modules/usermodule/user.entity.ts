import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRequestDto } from './dto/userRequestDto';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    public userId: string;

    @Column()
    public username: string;

    @Column()
    public password: string;

    @Column({
        nullable: true,
    })
    public token?: string;

    public static creaetFromDto(userRequestDto: UserRequestDto): User {
        const user = new User();
        user.username = userRequestDto.username;
        user.password = userRequestDto.password;
        return user;
    }
}