import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service.js';
import { NotFoundError } from 'rxjs';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { sanitizeUser } from '../common/utils/sanitized-user.js';

interface UserCredentials {
  email: string;
  password: string;
}

interface UserDetails {
  email: string;
  password: string;
  firstName: string;
  middleName?: string;
  lastName: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  // login fn
  async login(payload: UserCredentials) {
    const { email, password } = payload;

    if (!email || !password) throw new BadRequestException();

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) throw new NotFoundException('User not found');

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid email address or password');

    const refreshTokenPayload = { sub: existingUser.user_id };

    const accessTokenPayload = {
      ...refreshTokenPayload,
      role: existingUser.role,
    };

    const [refreshToken, accessToken] = await Promise.all([
      this.jwt.signAsync(refreshTokenPayload, {
        expiresIn: '30d',
        secret: this.config.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
      }),
      this.jwt.signAsync(accessTokenPayload, {
        expiresIn: '30d',
        secret: this.config.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
      }),
    ]);

    return { refreshToken, accessToken, user: sanitizeUser(existingUser) };
  }
}
