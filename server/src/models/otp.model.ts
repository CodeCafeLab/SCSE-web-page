import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('otps')
export class OTP {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 6 })
  otp!: string;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean = false;

  @Column({ 
    type: 'timestamp', 
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  expiresAt!: Date;

  @CreateDateColumn({ 
    type: 'timestamp',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  createdAt!: Date;

  @UpdateDateColumn({ 
    type: 'timestamp',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updatedAt!: Date;

  // Helper method to check if OTP is expired
  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  // Helper method to verify OTP
  verify(otp: string): boolean {
    if (this.isExpired()) {
      return false;
    }
    
    if (this.otp !== otp) {
      return false;
    }
    
    this.isVerified = true;
    return true;
  }
}