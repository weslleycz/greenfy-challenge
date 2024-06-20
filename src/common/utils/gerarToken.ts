import { User } from '../../entities';
import { JwtService } from '@nestjs/jwt';

export const gerarToken = async (user: User) => {
  const jwtService = new JwtService();
  const payload = {
    access_token: jwtService.sign(
      { id: user.id },
      {
        secret: process.env.Security_JWT,
        expiresIn: '2 days',
      },
    ),
  };
  return payload;
};
