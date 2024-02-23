import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NoticeEntity } from '../../entities/notice.entity';
import { createNoticeDto, updateNoticeDto } from './notice.type';

@UseGuards(AuthGuard)
@Controller('notices')
@ApiTags('Notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post('createNotice')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: NoticeEntity,
  })
  async createNotice(@Body() newService: createNoticeDto): Promise<NoticeEntity | HttpException> {
    return await this.noticeService.createNotice(newService);
  }

  @Get('getNotices')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: NoticeEntity,
  })
  async getNotices(): Promise<NoticeEntity[]> {
    return await this.noticeService.getNotices();
  }

  @Get('getNoticeById/:noticeId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: NoticeEntity,
  })
  async getNoticeById(@Param('noticeId') noticeId: number): Promise<NoticeEntity | HttpException> {
    const noticeFound = await this.noticeService.getNoticeById(noticeId);

    if (!noticeFound) {
      throw new HttpException('Notice not found', HttpStatus.NOT_FOUND);
    }

    return noticeFound;
  }

  @Get('getNoticesByClientId/:clientId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: NoticeEntity,
  })
  async getNoticesByClientId(@Param('clientId') clientId: number): Promise<NoticeEntity[]> {
    return await this.noticeService.getNoticeByClientId(clientId);
  }

  @Patch('updateNotice/:noticeId')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
    type: NoticeEntity,
  })
  async updateNotice(@Request() req, @Param('noticeId') noticeId: number, @Body() updateService: updateNoticeDto) {
    /*     if (req.userRole !== (ROLES.SUPER_ADMIN && ROLES.ADMIN)) {
      throw new HttpException(
        'User not enabled to create a specie',
        HttpStatus.UNAUTHORIZED,
      );
    } */

    const notice = await this.noticeService.getNoticeById(noticeId);
    if (!notice) {
      throw new HttpException(`Notice with id  ${noticeId} not found`, HttpStatus.NOT_FOUND);
    }

    notice.id_client = updateService.id_client;
    notice.description = updateService.description;
    notice.notice_date = updateService.notice_date;
    notice.expected_date = updateService.expected_date;
    notice.id_address = updateService.id_address;

    await this.noticeService.updateNotice(notice);
  }
}
