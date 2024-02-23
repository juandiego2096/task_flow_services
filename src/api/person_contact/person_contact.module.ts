import { Module } from '@nestjs/common';
import { PersonContactService } from './person_contact.service';
import { PersonContactController } from './person_contact.controller';
import { PersonContactEntity } from '../../entities/person_contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PersonContactEntity])],
  controllers: [PersonContactController],
  providers: [PersonContactService],
})
export class PersonContactModule {}
