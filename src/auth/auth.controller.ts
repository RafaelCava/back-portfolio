import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as RequestExpress } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: RequestExpress): Promise<any> {
    return this.authService.login(req?.user);
  }
}
