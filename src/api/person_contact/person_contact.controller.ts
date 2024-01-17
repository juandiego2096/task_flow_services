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
import { PersonContactService } from './person_contact.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonContactEntity } from 'src/entities/person_contact.entity';
import { createPersonContactDto } from './person_contact.type';

@UseGuards(AuthGuard)
@Controller('person_contacts')
@ApiTags('PersonContact')
export class PersonContactController {
  constructor(private readonly personContactService: PersonContactService) {}

  @Post('createPersonContact')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PersonContactEntity,
  })
  async createPersonContact(
    @Body() newPersonContact: createPersonContactDto,
  ): Promise<PersonContactEntity | HttpException> {
    return await this.personContactService.createPersonContact(
      newPersonContact,
    );
  }

  @Get('getPersonContacts')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: PersonContactEntity,
  })
  async getPersonContacts(): Promise<PersonContactEntity[]> {
    return await this.personContactService.getPersonContacts();
  }

  @Get('getPersonContactById/:personContactId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: PersonContactEntity,
  })
  async getPersonContactById(
    @Param('personContactId') personContactId: number,
  ): Promise<PersonContactEntity | HttpException> {
    const personContactFound =
      await this.personContactService.getPersonContactById(personContactId);

    if (!personContactFound) {
      throw new HttpException('Person contact not found', HttpStatus.NOT_FOUND);
    }

    return personContactFound;
  }

  @Patch('updatePersonContact/:personContactId')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
    type: PersonContactEntity,
  })
  async updatePersonContact(
    @Request() req,
    @Param('personContactId') personContactId: number,
    @Body() updatePersonContact: createPersonContactDto,
  ) {
    /*     if (req.userRole !== (ROLES.SUPER_ADMIN && ROLES.ADMIN)) {
      throw new HttpException(
        'User not enabled to create a specie',
        HttpStatus.UNAUTHORIZED,
      );
    } */

    const personContact =
      await this.personContactService.getPersonContactById(personContactId);
    if (!personContact) {
      throw new HttpException(
        `Person contact with id  ${personContactId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    personContact.name = updatePersonContact.name;
    personContact.phone = updatePersonContact.phone;
    personContact.observations = updatePersonContact.observations;

    await this.personContactService.updatePersonContact(personContact);
  }
}
