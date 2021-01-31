import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import formatFileToUrl from '@shared/utils/formatFileToUrl';

import Inspection from '@modules/inspections/infra/typeorm/entities/Inspection';

@Entity('inspections_glass')
export default class InspectionGlass {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  img_filename: string;

  @Column()
  @Exclude()
  inspection_id: string;

  @ManyToOne(() => Inspection, inspection => inspection.glass)
  @JoinColumn({ name: 'inspection_id' })
  inspection: Inspection;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  breakdown_url: string | null;

  @Expose({ name: 'glass_url' })
  getImage(): string | null {
    return formatFileToUrl(this.img_filename);
  }
}
