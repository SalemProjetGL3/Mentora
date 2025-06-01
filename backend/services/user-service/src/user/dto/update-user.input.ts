import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  jobTitle?: string;

  @Field({ nullable: true })
  company?: string;

  @Field({ nullable: true })
  role?: string;



  @Field(() => [String], { nullable: 'itemsAndList' })
  enrolledCourseIds?: string[];
}