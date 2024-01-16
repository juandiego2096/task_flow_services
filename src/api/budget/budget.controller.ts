import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { BudgetEntity } from 'src/entities/budget.entity';
import { createBudgetDto, updateBudgetDto } from './budget.type';

@UseGuards(AuthGuard)
@Controller('budget')
@ApiTags('Budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post('createBudget')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: BudgetEntity,
  })
  async createBudget(
    @Body() newBudget: createBudgetDto,
  ): Promise<BudgetEntity | HttpException> {
    return await this.budgetService.createBudget(newBudget);
  }

  @Get('getBudgets')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: BudgetEntity,
  })
  async getBudgets(): Promise<BudgetEntity[]> {
    return await this.budgetService.getBudgets();
  }

  @Get('getBudgetById/:budgetId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: BudgetEntity,
  })
  async getBudgetById(
    @Param('budgetId') budgetId: number,
  ): Promise<BudgetEntity | HttpException> {
    const budgetFound = await this.budgetService.getBudgetById(budgetId);

    if (!budgetFound) {
      throw new HttpException('Notice not found', HttpStatus.NOT_FOUND);
    }

    return budgetFound;
  }

  @Get('getBudgetsByClientId/:clientId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: BudgetEntity,
  })
  async getBudgetsByClientId(
    @Param('clientId') clientId: number,
  ): Promise<BudgetEntity[]> {
    return await this.budgetService.getBudgetsByClientId(clientId);
  }

  @Get('getBudgetsByAgentId/:agentId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: BudgetEntity,
  })
  async getBudgetsByAgentId(
    @Param('agentId') agentId: number,
  ): Promise<BudgetEntity[]> {
    return await this.budgetService.getBudgetsByAgentId(agentId);
  }

  @Get('getBudgetByNoticeId/:noticeId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: BudgetEntity,
  })
  async getBudgetByNoticeId(
    @Param('noticeId') noticeId: number,
  ): Promise<BudgetEntity | HttpException> {
    const budgetFound = await this.budgetService.getBudgetByNoticeId(noticeId);

    if (!budgetFound) {
      throw new HttpException('Budget not found', HttpStatus.NOT_FOUND);
    }

    return budgetFound;
  }

  @Patch('updateBudget/:budgetId')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
    type: BudgetEntity,
  })
  async updateBudget(
    @Request() req,
    @Param('budgetId') budgetId: number,
    @Body() updateService: updateBudgetDto,
  ) {
    /*     if (req.userRole !== (ROLES.SUPER_ADMIN && ROLES.ADMIN)) {
      throw new HttpException(
        'User not enabled to create a specie',
        HttpStatus.UNAUTHORIZED,
      );
    } */

    const budget = await this.budgetService.getBudgetById(budgetId);
    if (!budget) {
      throw new HttpException(
        `Budget with id  ${budgetId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    budget.id_client = updateService.id_client;
    budget.description = updateService.description;
    budget.notice_date = updateService.notice_date;
    budget.expected_date = updateService.expected_date;
    budget.id_address = updateService.id_address;

    await this.budgetService.updateBudget(budget);
  }
}
