import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Ip,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { LoginDTO } from './dto/login.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { type JwtAccessPayload } from './types/jwt-payload.type.js';
import { RefreshDTO } from './dto/refresh.dto.js';
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* user account login */
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() LoginDTO: LoginDTO, @Ip() ip: string) {
    return this.authService.login(LoginDTO.email, LoginDTO.password, {
      ipAddress: ip,
    });
  }
  /* ---------------------------------------------------------------------------------------------------------------------------- */
  /* ---------------------------------------------------------------------------------------------------------------------------- */

  /* fetching user account information */
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: JwtAccessPayload) {
    console.log('user', user);

    const data = await this.authService.me(user.userId);

    return data;
  }
  /* ---------------------------------------------------------------------------------------------------------------------------- */
  /* ---------------------------------------------------------------------------------------------------------------------------- */

  /* refreshing the user account token */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() dto: RefreshDTO, @Ip() ip: string) {
    return this.authService.refresh(dto.refreshToken, {
      ipAddress: ip,
    });
  }
  /* ---------------------------------------------------------------------------------------------------------------------------- */
  /* ---------------------------------------------------------------------------------------------------------------------------- */

  /* user account logout */
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() user: JwtAccessPayload) {
    await this.authService.revokeSession(user.userId, user.sid);

    return {
      success: true,
    };
  }
  /* ---------------------------------------------------------------------------------------------------------------------------- */
  /* ---------------------------------------------------------------------------------------------------------------------------- */
}
