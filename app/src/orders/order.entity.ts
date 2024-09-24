import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string;

    @Column('decimal')
        price: number;

    @ManyToOne(() => User, (user) => user.orders)
        user: User;
}
