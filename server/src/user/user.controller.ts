import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'generated/prisma/client';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  registerUser(@Body() body: User) {
    return this.userService.registerUser(body.email, body.password);
  }
  @Post('login')
  async logInUser(
    @Body() body: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(body);
    const token = await this.userService.logInUser(body.email, body.password);
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return { message: 'Login successful' };
  }
}
