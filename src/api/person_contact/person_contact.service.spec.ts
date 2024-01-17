import { Test, TestingModule } from '@nestjs/testing';
import { PersonContactService } from './person_contact.service';

describe('PersonContactService', () => {
  let service: PersonContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonContactService],
    }).compile();

    service = module.get<PersonContactService>(PersonContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
