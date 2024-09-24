// src/orders/orders.controller.ts
import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { OrderData } from './interface';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    findAll(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Order> {
        return this.ordersService.findOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createOrderDto: OrderData, @Request() req) {
        const user = req.user;
        // console.log(createOrderDto);
        return this.ordersService.create(createOrderDto, user);
    }
}
