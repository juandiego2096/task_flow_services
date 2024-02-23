import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonContactEntity } from '../../entities/person_contact.entity';
import { createPersonContactDto } from './person_contact.type';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PersonContactService {
  constructor(
    @InjectRepository(PersonContactEntity)
    private readonly personContactRepository: Repository<PersonContactEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createPersonContact(personContact: createPersonContactDto): Promise<PersonContactEntity> {
    return this.personContactRepository.save({
      name: personContact.name,
      phone: personContact.phone,
      observations: personContact.observations,
    });
  }

  async getPersonContacts(): Promise<PersonContactEntity[]> {
    return this.personContactRepository.find();
  }

  async getPersonContactById(personContactId: number): Promise<PersonContactEntity | null> {
    return await this.personContactRepository.findOne({
      where: { id: personContactId },
    });
  }

  async updatePersonContact(personContact: PersonContactEntity) {
    return this.personContactRepository.save(personContact);
  }
}
