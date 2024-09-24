import { Order } from 'src/orders/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string;

    @Column({ unique: true })
        email: string;

    @Column()
        password: string;

    @OneToMany(() => Order, (order) => order.user)
        orders: Order[];
}
