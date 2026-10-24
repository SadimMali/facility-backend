import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || authHeader.startsWith('Bearer'))
      throw new UnauthorizedException('You are not authenticated');

    const token = authHeader.split(' ')[1];

    if (!token) throw new UnauthorizedException('You are not authenticated');

    try {
      const decoded = this.jwt.verify(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      request['user'] = decoded;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
