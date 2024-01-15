import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeEntity } from 'src/entities/notice.entity';
import { Repository } from 'typeorm';
import { createNoticeDto } from './notice.type';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(NoticeEntity)
    private readonly noticeRepository: Repository<NoticeEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createNotice(notice: createNoticeDto): Promise<NoticeEntity> {
    return this.noticeRepository.save({
      id_client: notice.id_client,
      notice_date: notice.notice_date,
      expected_date: notice.expected_date,
      id_address: notice.id_address,
      description: notice.description,
      creation_date: notice.creation_date,
      creation_user_id: notice.creation_user_id,
    });
  }

  async getNotices(): Promise<NoticeEntity[]> {
    return this.noticeRepository.find();
  }

  async getNoticeById(noticeId: number): Promise<NoticeEntity | null> {
    return await this.noticeRepository.findOne({
      where: { id: noticeId },
    });
  }

  async getNoticeByClientId(clientId: number): Promise<NoticeEntity | null> {
    return await this.noticeRepository.findOne({
      where: { id_client: clientId },
    });
  }

  async updateNotice(notice: NoticeEntity) {
    return this.noticeRepository.save(notice);
  }
}
