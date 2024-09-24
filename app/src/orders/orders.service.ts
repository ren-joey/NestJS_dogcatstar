import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderData } from './interface';
import { User } from 'src/users/user.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    findAll(): Promise<Order[]> {
        return this.orderRepository.find({ relations: ['user'] });
    }

    findOne(id: number): Promise<Order> {
        return this.orderRepository.findOne({ where: { id }, relations: ['user'] });
    }

    async create(orderData: OrderData, user: User): Promise<Order> {
        // console.log(orderData);
        // console.log(user);

        const order = this.orderRepository.create({
            ...orderData,
            user
        });

        // console.log(JSON.stringify(order));

        return this.orderRepository.save(order);
    }
}
