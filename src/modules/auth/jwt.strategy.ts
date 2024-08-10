import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'KarsoToken',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(payload: any): Promise<any> {
    return { name: 'user' };
  }
}
