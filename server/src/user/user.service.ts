import { BadRequestException, Injectable } from '@nestjs/common';
import { prisma } from 'src/libs/prisma';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}

  async registerUser(email: string, password: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: 'Register  Success',
    };
  }

  async logInUser(email: string, password: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = {
      userId: existingUser.id,
      email: existingUser.email,
    };

    const token = this.jwtService.sign(payload);
    return token;
  }
}
