/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('mo_posts')
export class MoPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'motel_id', nullable: true })
    motelId: number | null;

    @Column({ name: 'phone_number', nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    title: string;

    @Column({ name: 'description', type: 'text', nullable: true })
    description: string;

    @Column({ name: 'motel_name', nullable: true })
    motelName: string;

    @Column({ name: 'tower_name', nullable: true })
    towerName: string;

    @Column({ default: 1, nullable: true })
    capacity: number;

    @Column({ default: 0, nullable: true })
    sex: number;

    @Column({ default: 0, nullable: true })
    area: number;

    @Column({ default: 0, nullable: true })
    money: number;

    @Column({ default: 0, nullable: true })
    min_money: number;
    @Column({ default: 0, nullable: true })
    max_money: number;

    @Column({ default: 0, nullable: true })
    deposit: number;

    @Column({ name: 'electric_money', default: 0, nullable: true })
    electricMoney: number;

    @Column({ name: 'water_money', default: 0, nullable: true })
    waterMoney: number;

    @Column({ name: 'has_wifi', default: true, nullable: true })
    hasWifi: boolean;

    @Column({ name: 'wifi_money', default: 0, nullable: true })
    wifiMoney: number;

    @Column({ name: 'has_park', default: true, nullable: true })
    hasPark: boolean;

    @Column({ name: 'park_money', default: 0, nullable: true })
    parkMoney: number;

    @Column({ name: 'province_name', nullable: true })
    provinceName: string;

    @Column({ name: 'district_name', nullable: true })
    districtName: string;

    @Column({ name: 'wards_name', nullable: true })
    wardsName: string;

    @Column({ nullable: true })
    province: number;

    @Column({ nullable: true })
    district: number;

    @Column({ nullable: true })
    wards: number;

    @Column({ name: 'address_detail', nullable: true })
    addressDetail: string;

    @Column({ name: 'has_wc', default: true, nullable: true })
    hasWc: boolean;

    @Column({ name: 'has_window', default: false, nullable: true })
    hasWindow: boolean;

    @Column({ name: 'has_security', default: true, nullable: true })
    hasSecurity: boolean;

    @Column({ name: 'has_free_move', default: false, nullable: true })
    hasFreeMove: boolean;

    @Column({ name: 'has_own_owner', default: false, nullable: true })
    hasOwnOwner: boolean;

    @Column({ name: 'has_air_conditioner', default: false, nullable: true })
    hasAirConditioner: boolean;

    @Column({ name: 'has_water_heater', default: false, nullable: true })
    hasWaterHeater: boolean;

    @Column({ name: 'has_kitchen', default: false, nullable: true })
    hasKitchen: boolean;

    @Column({ name: 'has_fridge', default: false, nullable: true })
    hasFridge: boolean;

    @Column({ name: 'has_washing_machine', default: false, nullable: true })
    hasWashingMachine: boolean;

    @Column({ name: 'has_mezzanine', default: false, nullable: true })
    hasMezzanine: boolean;

    @Column({ name: 'has_bed', default: false, nullable: true })
    hasBed: boolean;

    @Column({ name: 'has_wardrobe', default: false, nullable: true })
    hasWardrobe: boolean;

    @Column({ name: 'has_tivi', default: false, nullable: true })
    hasTivi: boolean;

    @Column({ name: 'has_pet', default: false, nullable: true })
    hasPet: boolean;

    @Column({ name: 'has_balcony', default: false, nullable: true })
    hasBalcony: boolean;

    @Column({ name: 'hour_open', default: 0, nullable: true })
    hourOpen: number;

    @Column({ name: 'minute_open', default: 0, nullable: true })
    minuteOpen: number;

    @Column({ name: 'hour_close', default: 0, nullable: true })
    hourClose: number;

    @Column({ name: 'minute_close', default: 0, nullable: true })
    minuteClose: number;

    @Column({ name: 'has_finger_print', default: 0, nullable: true })
    hasFingerPrint: number;

    @Column({ name: 'has_kitchen_stuff', default: 0, nullable: true })
    hasKitchenStuff: number;

    @Column({ name: 'has_table', default: 0, nullable: true })
    hasTable: number;

    @Column({ name: 'has_decorative_lights', default: 0, nullable: true })
    hasDecorativeLights: number;

    @Column({ name: 'has_picture', default: 0, nullable: true })
    hasPicture: number;

    @Column({ name: 'has_tree', default: 0, nullable: true })
    hasTree: number;

    @Column({ name: 'has_pillow', default: 0, nullable: true })
    hasPillow: number;

    @Column({ name: 'has_mattress', default: 0, nullable: true })
    hasMattress: number;

    // @Column({ name: 'has_shoes_racks', default: 0, nullable: true })
    // hasShoesRacks: number;

    @Column({ name: 'has_curtain', default: 0, nullable: true })
    hasCurtain: number;

    @Column({ name: 'has_ceiling_fans', default: 0, nullable: true })
    hasCeilingFans: number;

    @Column({ name: 'has_mirror', default: 0, nullable: true })
    hasMirror: number;

    @Column({ nullable: true })
    unit: string;

    @Column({ type: 'longtext', nullable: true })
    images: string;

    @Column({ nullable: true })
    type: number;

    @Column({ name: 'mo_services', type: 'longtext', nullable: true })
    moServices: string;

    @Column({ nullable: true })
    status: number;

    @Column({ nullable: true })
    note: string;

    @Column({ name: 'admin_verified', default: 0, nullable: true })
    adminVerified: number;

    @Column({ name: 'available_motel', default: 0, nullable: true })
    availableMotel: number;

    @Column({ name: 'link_video', nullable: true })
    linkVideo: string;

    @Column({ name: 'quantity_vehicle_parked', default: 0, nullable: true })
    quantityVehicleParked: number;

    @Column({ name: 'number_floor', default: 1, nullable: true })
    numberFloor: number;

    @Column({ name: 'has_sofa', default: 0, nullable: true })
    hasSofa: number;

    @Column({ type: 'longtext', nullable: true })
    furniture: string;

    @Column({ name: 'number_calls', default: 0, nullable: true })
    numberCalls: number;

    @Column({ name: 'money_commission_user', default: 0, nullable: true })
    moneyCommissionUser: number;

    @Column({ name: 'money_commission_admin', default: 0, nullable: true })
    moneyCommissionAdmin: number;

    @Column({ name: 'admin_confirm_commission', default: 0, nullable: true })
    adminConfirmCommission: number;

    @Column({ name: 'percent_commission', default: 0, nullable: true })
    percentCommission: number;

    @Column({
        name: 'percent_commission_collaborator',
        default: 0,
        nullable: true,
    })
    percentCommissionCollaborator: number;

    @Column({
        name: 'time_push',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    timePush: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

