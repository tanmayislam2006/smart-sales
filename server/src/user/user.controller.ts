import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { Response } from 'express';
import { AuthGuard } from 'src/common/auth.guard';

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
    const token = await this.userService.logInUser(body.email, body.password);
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return {
      success: true,
      message: 'Log in Success',
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    return {
      success: true,
      message: 'Log Out Success',
    };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req) {
    return {
      success: true,
      data: req.user,
    };
  }
}
