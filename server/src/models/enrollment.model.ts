import { Entity, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.model';

export enum EnrollmentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
}

@Entity('enrollments')
export class Enrollment extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  courseName!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ 
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.PENDING 
  })
  status: EnrollmentStatus = EnrollmentStatus.PENDING;

  @Column({ type: 'date', nullable: true })
  enrollmentDate?: Date;

  @Column({ type: 'date', nullable: true })
  completionDate?: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amountPaid: number = 0;

  @Column({ type: 'varchar', length: 50, nullable: true })
  paymentMethod?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  transactionId?: string;

  @Column({ type: 'boolean', default: false })
  isPaid: boolean = false;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'int', nullable: false })
  userId!: number;

  @ManyToOne('User', 'enrollments', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: Relation<User>;

  // Add any additional enrollment-specific fields here
  @Column({ type: 'varchar', length: 100, nullable: true })
  batchTiming?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  instructorName?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean = true;
}
