import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

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
}
