import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginId: string, code: string) {
    const user = await this.usersService.findOne(loginId);
    if (user?.code !== code) {
      throw new UnauthorizedException('Invalid code');
    }
    if (user) {
      user.logined = true;
    }
    await this.usersService.save(user);

    const payload = {
      appId: user.appId,
      displayName: user.displayName,
      loginId: user.loginId,
      logined: user.logined,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      code: 200,
      data: {
        appId: user.appId,
        displayName: user.displayName,
        loginId: user.loginId,
        logined: user.logined,
        token: token,
      },
      message: 'OK',
    };
  }

  async set(loginId: string) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const displayName = Array.from({ length: 6 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join('');
    const user = {
      displayName,
      loginId: loginId,
      code,
    };
    await this.usersService.save(user);
    return {
      data: {
        code,
      },
    };
  }
}
