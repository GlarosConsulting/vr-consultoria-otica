import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import formatFileToUrl from '@shared/utils/formatFileToUrl';

import InspectionBreakdown from './InspectionBreakdown';
import InspectionGlass from './InspectionGlass';

export type Status = 'pending' | 'approved' | 'refused';
@Entity('inspections')
export default class Inspection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  is_detailed: boolean;

  @Column({ type: 'enum' })
  status: Status;

  @Column('timestamp with time zone')
  limit_date: Date;

  @Column()
  @Exclude()
  forward_img: string;

  @Column()
  @Exclude()
  croup_img: string;

  @Column()
  @Exclude()
  left_side_img: string;

  @Column()
  @Exclude()
  right_side_img: string;

  @Column()
  @Exclude()
  motor_img: string;

  @Column()
  @Exclude()
  chassi_img: string;

  @Column()
  @Exclude()
  document_img: string;

  @Column()
  @Exclude()
  panel_img: string;

  @Column()
  @Exclude()
  forward_left_img: string;

  @Column()
  @Exclude()
  forward_right_img: string;

  @Column()
  @Exclude()
  rear_left_img: string;

  @Column()
  @Exclude()
  rear_right_img: string;

  @Column()
  @Exclude()
  forward_right_with_opened_hood_img: string;

  @Column()
  @Exclude()
  forward_left_with_opened_hood_img: string;

  @Column()
  @Exclude()
  forward_with_opened_hood_img: string;

  @Column()
  @Exclude()
  rear_plate_img: string;

  @Column()
  @Exclude()
  opened_trunk_img: string;

  @Column()
  @Exclude()
  seal_plate_img: string;

  @Column()
  @Exclude()
  spare_tire_img: string;

  @Column()
  @Exclude()
  key_img: string;

  @Column()
  @Exclude()
  forward_right_wheel_img: string;

  @Column()
  @Exclude()
  forward_left_wheel_img: string;

  @Column()
  @Exclude()
  rear_left_wheel_img: string;

  @Column()
  @Exclude()
  rear_right_wheel_img: string;

  @Column()
  @Exclude()
  left_column_img: string;

  @Column()
  @Exclude()
  right_column_img: string;

  @Column()
  @Exclude()
  pedometer_img: string;

  @Column()
  @Exclude()
  forward_right_tire_img: string;

  @Column()
  @Exclude()
  forward_left_tire_img: string;

  @Column()
  @Exclude()
  rear_right_tire_img: string;

  @Column()
  @Exclude()
  rear_left_tire_img: string;

  @Column()
  @Exclude()
  console_img: string;

  @Column()
  @Exclude()
  engine_number_img: string;

  @Column()
  @Exclude()
  forward_right_buffer_img: string;

  @Column()
  @Exclude()
  forward_left_buffer_img: string;

  @Column()
  @Exclude()
  rear_right_buffer_img: string;

  @Column()
  @Exclude()
  rear_left_buffer_img: string;

  @OneToMany(() => InspectionBreakdown, breakdown => breakdown.inspection, {
    cascade: true,
  })
  @Exclude()
  breakdowns: InspectionBreakdown[];

  @OneToMany(
    () => InspectionGlass,
    inspectionGlass => inspectionGlass.inspection,
    {
      cascade: true,
    },
  )
  @Exclude()
  glass: InspectionGlass[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  forward_img_url: string | null;

  croup_img_url: string | null;

  left_side_img_url: string | null;

  right_side_img_url: string | null;

  motor_img_url: string | null;

  chassi_img_url: string | null;

  document_img_url: string | null;

  panel_img_url: string | null;

  @Expose({ name: 'images' })
  getImages(): object {
    return {
      forward_img_url: formatFileToUrl(this.forward_img),
      croup_img_url: formatFileToUrl(this.croup_img),
      left_side_img_url: formatFileToUrl(this.left_side_img),
      right_side_img_url: formatFileToUrl(this.right_side_img),
      motor_img_url: formatFileToUrl(this.motor_img),
      chassi_img_url: formatFileToUrl(this.chassi_img),
      document_img_url: formatFileToUrl(this.document_img),
      panel_img_url: formatFileToUrl(this.panel_img),
      forward_left_img_url: formatFileToUrl(this.forward_left_img),
      forward_right_img_url: formatFileToUrl(this.forward_right_img),
      rear_left_img_url: formatFileToUrl(this.rear_left_img),
      rear_right_img_url: formatFileToUrl(this.rear_right_img),
      forward_right_with_opened_hood_img_url: formatFileToUrl(
        this.forward_right_with_opened_hood_img,
      ),
      forward_left_with_opened_hood_img_url: formatFileToUrl(
        this.forward_left_with_opened_hood_img,
      ),
      forward_with_opened_hood_img_url: formatFileToUrl(
        this.forward_with_opened_hood_img,
      ),
      rear_plate_img_url: formatFileToUrl(this.rear_plate_img),
      opened_trunk_img_url: formatFileToUrl(this.opened_trunk_img),
      seal_plate_img_url: formatFileToUrl(this.seal_plate_img),
      spare_tire_img_url: formatFileToUrl(this.spare_tire_img),
      key_img_url: formatFileToUrl(this.key_img),
      forward_right_wheel_img_url: formatFileToUrl(
        this.forward_right_wheel_img,
      ),
      forward_left_wheel_img_url: formatFileToUrl(this.forward_left_wheel_img),
      rear_left_wheel_img_url: formatFileToUrl(this.rear_left_wheel_img),
      rear_right_wheel_img_url: formatFileToUrl(this.rear_right_wheel_img),
      left_column_img_url: formatFileToUrl(this.left_column_img),
      right_column_img_url: formatFileToUrl(this.right_column_img),
      pedometer_img_url: formatFileToUrl(this.pedometer_img),
      forward_right_tire_img_url: formatFileToUrl(this.forward_right_tire_img),
      forward_left_tire_img_url: formatFileToUrl(this.forward_left_tire_img),
      rear_right_tire_img_url: formatFileToUrl(this.rear_right_tire_img),
      rear_left_tire_img_url: formatFileToUrl(this.rear_left_tire_img),
      console_img_url: formatFileToUrl(this.console_img),
      engine_number_img_url: formatFileToUrl(this.engine_number_img),
      forward_right_buffer_img_url: formatFileToUrl(
        this.forward_right_buffer_img,
      ),
      forward_left_buffer_img_url: formatFileToUrl(
        this.forward_left_buffer_img,
      ),
      rear_right_buffer_img_url: formatFileToUrl(this.rear_right_buffer_img),
      rear_left_buffer_img_url: formatFileToUrl(this.rear_left_buffer_img),
      breakdowns: this.breakdowns,
      glass: this.glass,
    };
  }
}
