import { Entity, Column, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Enrollment } from './enrollment.model';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  password!: string;

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean = false;

  @Column({ type: 'varchar', length: 255, nullable: true })
  verificationToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  verificationTokenExpires?: Date;

  @OneToMany('Enrollment', 'user')
  enrollments!: Relation<Enrollment[]>;

  // Add any additional user fields as needed
  @Column({ type: 'varchar', length: 50, nullable: true })
  role?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean = true;
}
