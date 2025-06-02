import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  })
  role: string = 'USER';

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  jobTitle?: string;

  @Column({ nullable: true })
  company?: string;

  @Column('simple-array', { nullable: true })
  enrolledCourseIds: string[];

  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'varchar', nullable: true })
  verificationToken: string | null;

}

