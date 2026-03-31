import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    const user = await this.authService.registerUser(registerDto);
    return user;
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return await this.authService.loginUser(loginDto);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') token: string) {
    return this.authService.refreshToken(token);
  }

  @Post('logout')
  logout(@Body('user_id') id: string) {
    return this.authService.logoutUser(id);
  }
}
