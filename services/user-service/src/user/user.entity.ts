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
  
  @Field()
  @Column({ default: false })
  isVerified: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  verificationToken: string;
}