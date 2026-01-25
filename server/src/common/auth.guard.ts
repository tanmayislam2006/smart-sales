import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const token = request.cookies?.accessToken;

    if (!token) {
      throw new UnauthorizedException('Authentication required');
    }

    try {
      const decoded = this.jwtService.verify(token);

      request.user = decoded;

      return true;
    } catch (error: any) {
      console.log(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
