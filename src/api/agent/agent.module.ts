import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { AgentEntity } from 'src/entities/agent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AgentEntity])],
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule {}
