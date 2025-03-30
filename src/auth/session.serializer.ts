import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    // Store only the user ID as a string in the session
    done(null, user._id.toString());
  }

  async deserializeUser(payload: string, done: Function) {
    try {
      // Ensure the payload is a valid ObjectId string before conversion
      if (!ObjectId.isValid(payload)) {
        return done(new Error('Invalid user ID'), null);
      }

      const user = await this.usersService.findById(payload);
      if (!user) {
        return done(null, null);
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
