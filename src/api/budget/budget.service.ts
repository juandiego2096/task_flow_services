import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { BudgetEntity } from '../../entities/budget.entity';
import { Repository } from 'typeorm';
import { createBudgetDto } from './budget.type';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(BudgetEntity)
    private readonly budgetRepository: Repository<BudgetEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createBudget(budget: createBudgetDto): Promise<BudgetEntity> {
    return this.budgetRepository.save({
      id_client: budget.id_client,
      id_agent: budget.id_agent,
      notice_date: budget.notice_date,
      expected_date: budget.expected_date,
      id_address: budget.id_address,
      description: budget.description,
      creation_date: budget.creation_date,
      creation_user_id: budget.creation_user_id,
      amount: budget.amount,
      id_notice: budget.id_notice,
    });
  }

  async getBudgets(): Promise<BudgetEntity[]> {
    return this.budgetRepository.find();
  }

  async getBudgetById(budgetId: number): Promise<BudgetEntity | null> {
    return await this.budgetRepository.findOne({
      where: { id: budgetId },
    });
  }

  async getBudgetsByClientId(clientId: number): Promise<BudgetEntity[]> {
    return await this.budgetRepository.find({
      where: { id_client: clientId },
    });
  }

  async getBudgetsByAgentId(agentId: number): Promise<BudgetEntity[]> {
    return await this.budgetRepository.find({
      where: { id_agent: agentId },
    });
  }

  async getBudgetByNoticeId(noticeId: number): Promise<BudgetEntity | null> {
    return await this.budgetRepository.findOne({
      where: { id_notice: noticeId },
    });
  }

  async updateBudget(budget: BudgetEntity) {
    return this.budgetRepository.save(budget);
  }
}
