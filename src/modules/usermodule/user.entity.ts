import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRequestDto } from './dto/userRequestDto';
import { USER_ROLE } from './user.roles';

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

    @Column({
        type: 'enum',
        enum: USER_ROLE,
        nullable: false,
        default: USER_ROLE.USER,
    })
    public role: USER_ROLE = USER_ROLE.USER;

    public static creaetFromDto(userRequestDto: UserRequestDto): User {
        const user = new User();
        user.username = userRequestDto.username;
        user.password = userRequestDto.password;
        user.role = userRequestDto.role;
        return user;
    }
}