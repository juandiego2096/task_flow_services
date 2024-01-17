import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServiceModule } from './service/service.module';
import { BudgetModule } from './budget/budget.module';
import { NoticeModule } from './notice/notice.module';
import { ServiceStatusModule } from './service_status/service_status.module';
import { ServicePriorityModule } from './service_priority/service_priority.module';
import { RoadTypeModule } from './road_type/road_type.module';
import { ClientModule } from './client/client.module';
import { AgentModule } from './agent/agent.module';
import { AddressModule } from './address/address.module';
import ofDbOptions from '../utils/config/db.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: ofDbOptions,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.secrets'],
    }),
    AuthModule,
    UserModule,
    ServiceModule,
    BudgetModule,
    NoticeModule,
    ServiceStatusModule,
    ServicePriorityModule,
    RoadTypeModule,
    ClientModule,
    AgentModule,
    AddressModule,
  ],
})
export class ApiModule {}
