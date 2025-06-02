import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from 'auth-utils';
import { Logger } from '@nestjs/common'; 

@Resolver(() => User)
export class UserResolver {
  
  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Query(() => User, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  async getCurrentUser(@Context() context: any): Promise<User> {
    // These log calls will now work because 'this.logger' is initialized
    this.logger.log('Attempting to fetch current user...');
    const userId = context.req.user?.id;
    this.logger.log(`User ID from context: ${userId}`);

    if (!userId) {
      this.logger.warn('User not authenticated - userId is missing.');
      throw new Error('User not authenticated');
    }

    try {
      const user = await this.userService.findOne(userId);
      this.logger.log(`Found user: ${JSON.stringify(user)}`); // Log the user object
      return user;
    } catch (error) {
      this.logger.error(`Error fetching user with ID ${userId}: ${error.message}`, error.stack);
      throw error; // Re-throw the error
    }
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return this.userService.remove(id);
  }

  @Mutation(() => User)
  async enrollUserInCourse(
    @Args('userId', { type: () => ID }) userId: number,
    @Args('courseId') courseId: string
  ): Promise<User> {
    return this.userService.enrollInCourse(userId, courseId);
  }

  @Mutation(() => User)
  async unenrollUserFromCourse(
    @Args('userId', { type: () => ID }) userId: number,
    @Args('courseId') courseId: string
  ): Promise<User> {
    return this.userService.unenrollFromCourse(userId, courseId);
  }
}