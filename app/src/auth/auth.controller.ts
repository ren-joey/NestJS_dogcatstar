import { Controller, Post, Body, Request, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('register')
    async register(@Body() createUserDto: any) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() loginUserDto: any) {
        const user = await this.authService.validateUser(
            loginUserDto.email,
            loginUserDto.password
        );

        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        return this.authService.login(loginUserDto);
    }
}
