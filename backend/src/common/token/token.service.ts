import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}
  async accessToken(payload: any) {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_SECRET,
      expiresIn: '15m',
    });
  }

  async refreshToken(payload: any) {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '7d',
    });
  }
}
