import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashService } from 'src/common/hash/hash.service';
import { TokenService } from 'src/common/token/token.service';
import { Role } from 'src/role/model/role.model';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async registerUser(registerDto: RegisterUserDto) {
    const hash = await this.hashService.hashPassword(registerDto.password);

    const user = await this.userService.createUser({
      ...registerDto,
      password: hash,
      role: 'user',
    });
    const payload = { sub: user._id, role: user.roleName };
    const access_token = await this.tokenService.accessToken(payload);
    const refresh_token = await this.tokenService.refreshToken(payload);

    const hashRef = await this.hashService.hashPassword(refresh_token);
    await this.userService.findByIdToken(user._id, hashRef);
    return {
      access_token: access_token,
      refresh_token: hashRef,
      userId: user._id,
      email: user.email,
      username: user.username,
      role: user.roleName,
    };
  }

  async loginUser(loginDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashService.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, role: (user.roleId as Role).name };
    const access_token = await this.tokenService.accessToken(payload);
    const refresh_token = await this.tokenService.refreshToken(payload);

    const hash = await this.hashService.hashPassword(refresh_token);
    await this.userService.findByIdToken(user._id, hash);

    return {
      access_token: access_token,
      refresh_token: hash,
      userId: user._id,
      username: user.username,
      email: user.email,
      role: (user.roleId as Role).name,
    };
  }

  async logoutUser(user_id: string) {
    console.log(user_id);
    return await this.userService.logout(user_id);
  }
}
