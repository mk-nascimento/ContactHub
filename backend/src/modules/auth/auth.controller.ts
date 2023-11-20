import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email);
  }

  /**
   * Validate the provided JSON Web Token (JWT) for authentication.
   * This method is intentionally left empty because token validation is handled by JwtAuthGuard.
   * No additional code is required here.
   *
   * @throws {UnauthorizedException} Throws an exception if the token is invalid.
   * Exception view:
   * ```json
   * {
   *    "message": "Unauthorized",
   *    "statusCode": 401
   * }
   * ```
   *
   * @returns {void} This method does not have any return value.
   */
  @UseGuards(JwtAuthGuard)
  @Get('validate')
  @HttpCode(HttpStatus.NO_CONTENT)
  validateToken(): void {
    /** The method is intentionally left empty for token validation purposes **/
  }
}
