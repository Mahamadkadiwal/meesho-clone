import { Body, Controller, Post, Req } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';

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

  @Post('logout')
  logout(@Body('user_id') id: string) {
    return this.authService.logoutUser(id);
  }
}
