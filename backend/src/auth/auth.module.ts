import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    CommonModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.ACCESS_SECRET,
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
})
export class AuthModule {}
