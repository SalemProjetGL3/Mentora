import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column({
    type: 'enum',
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  })
  role: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  jobTitle?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  company?: string;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  enrolledCourseIds: string[];

  @Field()
  @Column({ default: false })
  isVerified: boolean;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  verificationToken: string | null;

}