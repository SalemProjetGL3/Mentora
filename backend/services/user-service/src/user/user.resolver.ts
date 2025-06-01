import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
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
async getCurrentUser(@Context() context: any): Promise<User> {
  const userId = context.req.user?.id;
  if (!userId) {
    throw new Error('User not authenticated');
  }
  return this.userService.findOne(userId);
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
