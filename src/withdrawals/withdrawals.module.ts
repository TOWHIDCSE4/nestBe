import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from '../auth/repositories/user.repository';
import { TypeOrmCustomModule } from '../common/typeorm-custom';
import { NotificationService } from '../notification/services/notification.service';
import { WithdrawalsAdminController } from './controllers/admin/withdrawals.admin.controller';
import { WithdrawalsCommunityController } from './controllers/community/withdraws.community.conntroller';
import { EWalletCollaboratorsRepository } from './repositories/e-wallet-collaborators.repository';
import { WalletTransactionsRepository } from './repositories/wallet-transactions.repository';
import { WithdrawalsRepository } from './repositories/withdrawals.repository';
import { WithdrawalsAdminService } from './services/admin/withdrawals.admin.service';
import { WithdrawalsCommunityService } from './services/community/withdraws.community.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmCustomModule.forFeature([
      WithdrawalsRepository,
      WalletTransactionsRepository,
      UserRepository,
      NotificationService,
      EWalletCollaboratorsRepository,
    ]),
  ],
  providers: [WithdrawalsAdminService, WithdrawalsCommunityService],
  controllers: [WithdrawalsAdminController, WithdrawalsCommunityController],
})
export class WithdrawalsModule {}
