import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OptOrderData, OrderData } from './interface';
import { User } from 'src/users/user.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    findAll(): Promise<Order[]> {
        // return this.orderRepository.find({ relations: ['user'] });
        return this.orderRepository.find();
    }

    findOne(id: number): Promise<Order> {
        // return this.orderRepository.findOne({ where: { id }, relations: ['user'] });
        return this.orderRepository.findOne({ where: { id } });
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

    async update(orderId: number, optOrderData: OptOrderData, user: User): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['user']
        });

        if (!order) throw new NotFoundException('Order not found');

        if (order.user.id !== user.id) throw new ForbiddenException('You do not have permission to update this order');

        if (optOrderData.name) order.name = optOrderData.name;
        if (optOrderData.price) order.price = optOrderData.price;

        return this.orderRepository.save(order);
    }

    async delete(orderId: number, user: User) {
        const order = await this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['user']
        });

        if (!order) throw new NotFoundException('Order not found');

        if (order.user.id !== user.id) throw new ForbiddenException('You do not have permission to update this order');

        return this.orderRepository.remove(order);
    }
}
