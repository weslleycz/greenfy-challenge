import { User } from '../../entities';
import { JwtService } from '@nestjs/jwt';

export const generateToken = async (user: User) => {
  const jwtService = new JwtService();
  const payload = {
    access_token: jwtService.sign(
      { id: user.id },
      {
        secret: process.env.SECURITY_JWT,
        expiresIn: '2 days',
      },
    ),
    refresh_token: jwtService.sign(
      { id: user.id, email: user.email },
      {
        secret: process.env.SECURITY_JWT_REFRESH,
        expiresIn: '4 days',
      },
    ),
  };
  return payload;
};
