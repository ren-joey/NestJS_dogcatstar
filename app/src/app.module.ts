import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/order.entity';


@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mariadb',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [User, Order], // If you enable "autoLoadEntities", disable this line
            synchronize: true,
            // autoLoadEntities: true
        }),
        AuthModule,
        OrdersModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
