import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    // 取得所有訂單
    findAll(): Promise<Order[]> {
        return this.orderRepository.find({ relations: ['user'] });
    }

    // 根據 ID 取得單一訂單
    findOne(id: number): Promise<Order> {
        return this.orderRepository.findOne({ where: { id }, relations: ['user'] });
    }
}
