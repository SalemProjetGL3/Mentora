import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    if (!user || !user.id) {
      return done(new Error('User not found'), null);
    }
    done(null, user.id); // Store numeric ID in session
  }

  async deserializeUser(userId: number, done: Function) {
    try {
      const user = await this.usersService.findById(userId);
      if (!user) {
        return done(null, null);
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
