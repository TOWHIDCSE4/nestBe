import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';


@Entity('motels')
export class Motels extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'bigint', nullable: true })
  type: number;

  @Column({ type: 'bigint' })
  accuracy: number;

  @Column({ type: 'varchar', nullable: true })
  phone_number: string;

  @Column({ type: 'varchar' , nullable: true})
  title: string;

  @Column({ type: 'longtext',nullable: true })
  description: string;

  @Column({ type: 'varchar',nullable: true })
  motel_name: string;

  @Column({ type: 'int', nullable: true })
  capacity: number;
  
  @Column({ type: 'int', nullable: true })
  sex: number;

  @Column({ type: 'double', nullable: true })
  area: number;

  @Column({ type: 'double', default: 1, nullable: true })
  money?: number;

  @Column({ type: 'double', default: 1, nullable: true })
  deposit?: number;

  @Column({ type: 'double', default: 1, nullable: true })
  electric_money	?: number;

  @Column({ type: 'double', default: 1, nullable: true })
  water_money: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  has_wifi?: number;

  @Column({ type: 'double', default: 1, nullable: true })
  wifi_money: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  has_park?: number;

  @Column({ type: 'double', default: 1, nullable: true })
  park_money: number;

  @Column({ type: 'varchar', nullable: true })
  video_link: string;

  @Column({ type: 'varchar', nullable: true })
  province_name: string;

  @Column({ type: 'varchar', nullable: true })
  district_name	: string;

  @Column({ type: 'varchar', nullable: true })
  wards_name: string;

  @Column({ type: 'int', nullable: true })
  province: number;

  @Column({ type: 'int', nullable: true })
  district: number;

  @Column({ type: 'int', nullable: true })
  wards: number;

  @Column({ type: 'varchar', nullable: true })
  address_detail: string;

  @Column({ type: 'tinyint', nullable: true })
  has_wc: number;

  @Column({ type: 'tinyint', nullable: true })
  is_room_hidden?: number;

  @Column({ type: 'tinyint', nullable: true })
  has_window: number;

  @Column({ type: 'tinyint', nullable: true })
  has_security: number;

  @Column({ type: 'tinyint', nullable: true })
  has_free_move: number;

  

  @Column({ type: 'double', default: 1, nullable: true })
  deposit_money?: number;

  @Column({ type: 'varchar', nullable: true })
  cmnd_number?: string;

  @Column({ type: 'varchar', nullable: true })
  cmnd_front_image_url?: string;

  @Column({ type: 'varchar', nullable: true })
  cmnd_back_image_url?: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  status?: number;

  @Column({ type: 'timestamp', nullable: true })
  pay_start?: Date;

  @Column({ type: 'longtext', nullable: true })
  images?: string;

  @Column({ type: 'longtext', nullable: true })
  mo_services?: string;

  @Column({ type: 'varchar', nullable: true })
  note?: string;

  @Column({ type: 'double', nullable: true, default: 0 })
  deposit_amount_paid?: number;

  @Column({ type: 'longtext', nullable: true })
  images_deposit?: string;

  @Column({ type: 'longtext', nullable: true })
  furniture?: string;

  @Column({ type: 'timestamp', nullable: true })
  deposit_payment_date?: Date;

  @Column({ type: 'timestamp', nullable: true })
  deposit_used_date?: Date;

  @Column({ type: 'double', nullable: true })
  deposit_actual_paid?: number;
  motels: Motels[];
}
