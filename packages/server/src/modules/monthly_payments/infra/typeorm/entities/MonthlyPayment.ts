import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type Status = 'paid' | 'pending' | 'opened';

@Entity('monthly_payments')
export default class MonthlyPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  title_number: string;

  @Column()
  due_date: Date;

  @Column()
  value: number;

  @Column()
  status: Status;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
