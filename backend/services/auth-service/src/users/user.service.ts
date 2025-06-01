import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Register a new user
  async create(createUserDto: CreateUserDto): Promise<User> {

    const user = this.userRepository.create({
      ...createUserDto,
      password: createUserDto.password,
    });

    return this.userRepository.save(user);
  }

  // Find a user by email
  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Find a user by ID
  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  // Mark a user as verified
  async markVerified(email: string): Promise<void> {
    await this.userRepository.update({ email }, {
      isVerified: true,
      verificationToken: null,
    });
  }

  // Update the verification token
  async updateVerificationToken(email: string, token: string): Promise<void> {
    await this.userRepository.update({ email }, { verificationToken: token });
  }

  // Delete a user by email
  async deleteUser(email: string): Promise<void> {
    await this.userRepository.delete({ email });
  }

  // Update a user's password
  async updatePassword(email: string, newPassword: string): Promise<void> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    user.password = newPassword;

    // Use the repository's save method to persist the changes
    await this.userRepository.save(user);
  }
}
