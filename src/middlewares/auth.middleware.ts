import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import { IJwtPayload } from '../common';
dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    const authorizationHeader = headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new HttpException('Token não fornecido', HttpStatus.UNAUTHORIZED);
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new HttpException('Token não fornecido', HttpStatus.UNAUTHORIZED);
    }
    try {
      const playload = <IJwtPayload>this.jwtService.verify(token, {
        secret: process.env.Security_JWT,
      });
      req.headers.id = playload.id;
      next();
    } catch (error) {
      throw new HttpException('Token invalido', HttpStatus.FORBIDDEN);
    }
  }
}
