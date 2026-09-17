import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { User, UserType } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  JwtAccessPayload,
  RefreshTokenPayload,
} from './types/jwt-payload.type.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcryptjs';
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

export interface LoginContext {
  ipAddress?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersServices: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}
  /* ------------------------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------------------------ */

  async login(email: string, password: string, context: LoginContext = {}) {
    /* Checking if the User exists in the Database */
    const user: any = await this.usersServices.findByEmail(email);
    await this.passwordMatchWithHash(user, password);

    if (!user) {
      throw new BadRequestException('Email Account Not Found');
    }

    /* Checking the status of the User */
    if (user!.status !== 'ACTIVE') {
      throw new ForbiddenException('Email Account Not Active');
    }

    /* User AccessToken and RefreshToken */
    const token = await this.issueTokenPair(user, context);

    /* Sending the Response */
    return {
      ...token,
      userType: user.userType,
    };
  }
  /* ------------------------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------------------------ */

  /* user accesstoken and refreshtoken */
  async issueTokenPair(user: User, context: LoginContext = {}) {
    /* refreshToken ExpireAt in 30 days */
    const expiredAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    /* creating the Session */
    const session = await this.prisma.userSession.create({
      data: {
        userId: user.id,
        deviceLabel: 'Unknown',
        ipAddress: context?.ipAddress,
        refreshTokenHash: '',
        expiresAt: expiredAt,
      },
    });
    /* ------------------------------------------------------------------------------------------------------------------------------ */
    /* ------------------------------------------------------------------------------------------------------------------------------ */

    /* creating the user account access token and the user refresh token */
    const accessTokenPayload: JwtAccessPayload = {
      userId: user.id,
      email: user.email,
      userType: user.userType,
      sid: session.id,
    };

    const RefreshTokenPayload: RefreshTokenPayload = {
      userId: user.id,
      sessionId: session.id,
    };
    /* ------------------------------------------------------------------------------------------------------------------------------ */
    /* ------------------------------------------------------------------------------------------------------------------------------ */

    /* Creating the user tokens */
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(accessTokenPayload, {
        secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.config.get<string>(
          'JWT_ACCESS_EXPIRES_IN',
          '15m',
        ) as never,
      }),

      this.jwtService.sign(RefreshTokenPayload, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get<string>(
          'JWT_REFRESH_EXPIRES_IN',
          '30d',
        ) as never,
      }),
    ]);

    const refresTokenHash = await bcrypt.hash(refreshToken, 10);
    /* ------------------------------------------------------------------------------------------------------------------------------ */
    /* ------------------------------------------------------------------------------------------------------------------------------ */

    /* updating the db */
    await this.prisma.userSession.update({
      where: {
        id: session.id,
      },
      data: {
        refreshTokenHash: refresTokenHash,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }
  /* ------------------------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------------------------ */

  /* checking if the user password is matching password in db */
  private async passwordMatchWithHash(
    user: User | null,
    password: string,
  ): Promise<void> {
    if (!user) {
      throw new BadRequestException('Invalid User Account or Password');
    }

    const matches = await bcrypt.compare(password, user.passwordHash);

    if (!matches) {
      throw new BadRequestException('Invalid User Account or Password');
    }
  }

  /* fetching user account information */
  async me(userId: string) {
    const data: any = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const { passwordHash, twoFactorSecret, ...rest } = data;

    return rest;
  }
  /* ------------------------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------------------------ */

  /* refreshing the user account token */
  async refresh(refreshToken: string, context: LoginContext = {}) {
    const decoded = this.verifyRefreshToken(refreshToken);
    const session = await this.prisma.userSession.findUnique({
      where: {
        id: decoded.sessionId,
      },
    });
    if (!session || session.revokedAt || session.expiresAt < new Date()) {
      throw new UnauthorizedException(
        'User Account Session Is No Longer Valid',
      );
    }

    const matches = await bcrypt.compare(
      refreshToken,
      session.refreshTokenHash,
    );
    if (!matches) {
      throw new UnauthorizedException('User Account Invalid Refresh Token');
    }

    const user = await this.usersServices.findById(decoded.userId);
    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User Account Not Existing');
    }

    await this.prisma.userSession.update({
      where: { id: session.id },
      data: { revokedAt: new Date() },
    });

    return this.issueTokenPair(user, {
      ipAddress: context?.ipAddress,
    });
  }

  private verifyRefreshToken(refreshToken: string): RefreshTokenPayload {
    try {
      return this.jwtService.verify<RefreshTokenPayload>(refreshToken, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or Expired Refresh Token');
    }
  }
  /* ------------------------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------------------------ */

  /* user account logout */
  async revokeSession(userId: string, sessionId: string): Promise<void> {
    const session = await this.prisma.userSession.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (!session || session.userId !== userId) {
      throw new BadRequestException('User Account Session Not Found');
    }

    await this.prisma.userSession.update({
      where: {
        id: sessionId,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }
}
