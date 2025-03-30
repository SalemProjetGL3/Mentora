import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose'; // MongoDB integration
import { Model } from 'mongoose'; // MongoDB integration

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>, // MongoDB integration
  ) {}

  // Register a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if the user already exists
    const userExists = await this.userModel.findOne({ email: createUserDto.email });
    if (userExists) {
      throw new Error('User with this email already exists.');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return createdUser.save();
  }

  // Find a user by email
  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? user : null; // Return null if no user is found
  }

  // Optional: Find all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Optional: Find a user by ID
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec(); // Fetch user from MongoDB
  }
}
