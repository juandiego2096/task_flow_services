import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { BudgetEntity } from 'src/entities/budget.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetEntity])],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
