import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('system_permissions')
export class SystemPermissions {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  view_badge?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_motel?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_user?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_mo_post?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_contract?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_bill?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_message?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_report_problem?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_service?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_order_service_sell?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_notification?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  setting_banner?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  setting_contact?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  setting_help?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_motel_consult?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_report_statistic?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  all_access?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_service_sell?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  setting_category_help?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  able_decentralization?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  unable_access?: number;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  able_remove?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_renter?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_collaborator?: number;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  manage_wallet?: number;

  @Column({ type: 'timestamp', nullable: true })
  created_at?: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at?: Date;
}
