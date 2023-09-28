import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from './user.entity';

@Entity('user_device_tokens')
export class UserDeviceTokens extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'user_id', type: 'bigint' })
  user_id: number;

  @Column({ type: 'varchar' })
  device_token: string;

  @Column({ type: 'varchar' })
  device_id: string;

  @Column({ type: 'int' })
  device_type: number;

  @Column({ type: 'tinyint' })
  active: number;

  @ManyToOne(() => User, (user) => user.user_device_tokens)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
