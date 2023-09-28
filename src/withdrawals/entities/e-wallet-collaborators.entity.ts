import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('e_wallet_collaborators')
export class EWalletCollaborators {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'double', nullable: true, default: 0 })
  account_balance?: number;

  @Column({ type: 'integer', nullable: true, default: 2 })
  status?: number;

  @Column({ name: 'created_at', type: 'timestamp', nullable: true })
  created_at?: Date;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
  updated_at?: Date;
}
