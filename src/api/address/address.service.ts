import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from 'src/entities/address.entity';
import { Repository } from 'typeorm';
import { createAddressDto } from './address.type';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createAddress(address: createAddressDto): Promise<AddressEntity> {
    const addressFound = await this.addressRepository.findOne({
      where: {
        id_road_type: address.id_road_type,
        name: address.name,
        complementary: address.complementary,
        number: address.number,
        postal_code: address.postal_code,
        province: address.province,
        location: address.location,
      },
    });

    if (addressFound) return addressFound;

    return this.addressRepository.save({
      id_road_type: address.id_road_type,
      name: address.name,
      complementary: address.complementary,
      number: address.number,
      postal_code: address.postal_code,
      province: address.province,
      location: address.location,
    });
  }

  async getAddresses(): Promise<AddressEntity[]> {
    return this.addressRepository.find();
  }

  async getAddressById(addressId: number): Promise<AddressEntity | null> {
    return await this.addressRepository.findOne({
      where: { id: addressId },
    });
  }

  async updateAddress(address: AddressEntity) {
    return this.addressRepository.save(address);
  }
}
