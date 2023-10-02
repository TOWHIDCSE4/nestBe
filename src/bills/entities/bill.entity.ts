/* eslint-disable prettier/prettier */
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bills')
export class Bills {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'bigint', unsigned: true })
    contract_id: number;

    @Column({ type: 'bigint', nullable: true })
    user_maker_id: number;

    @Column({ type: 'bigint', nullable: true })
    service_close_id: number;

    @Column({ type: 'int', default: 0 })
    status: number;

    @Column({ type: 'timestamp', nullable: true })
    date_payment: Date;

    @Column({ type: 'double', default: 0 })
    total_money_motel: number;

    @Column({ type: 'double', default: 0 })
    total_money_service: number;

    @Column({ type: 'double', default: 0 })
    total_final: number;

    @Column({ type: 'double', default: 0 })
    discount: number;

    @Column({ type: 'double', default: 0 })
    deposit_money: number;

    @Column({ type: 'text', nullable: true })
    images: string;

    @Column({ type: 'varchar', length: 191, nullable: true })
    @Index()
    content: string;

    @Column({ type: 'varchar', length: 191, nullable: true })
    @Index()
    note: string;

    @Column({ type: 'int', default: 0 })
    type_bill: number;

    @Column({ type: 'text', nullable: true })
    bill_log: string;

    @Column({ type: 'tinyint', default: 0 })
    is_init: number;
    
    @Column({ type: 'double', default: 0 })
    total_money_has_paid_by_deposit: number;

    @Column({ type: 'tinyint', default: 0 })
    has_use_deposit: number;

    @Column({ type: 'double', default: 0 })
    total_money_before_paid_by_deposit: number;

    @Column({ type: 'timestamp', nullable: true })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date;
}
