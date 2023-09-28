import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { EWalletCollaborators } from '../entities/e-wallet-collaborators.entity';

@Injectable()
export class EWalletCollaboratorsRepository extends BaseRepository<EWalletCollaborators> {
  constructor(dataSource: DataSource) {
    super(EWalletCollaborators, dataSource);
  }
}
