import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Register user
  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Login user
  async login(user: any) {
    const payload = { username: user.username, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Validate user credentials (for login)
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  // Serialize method - store user information in the session (only store user id, or minimal data)
  serializeUser(user: any, done: Function) {
    done(null, user.id); // only store the user ID in the session
  }

  // Deserialize method - retrieve full user info based on the session data (user id)
  async deserializeUser(payload: any, done: Function) {
    const user = await this.usersService.findById(payload); // Find user from DB or service
    done(null, user);
  }
}
