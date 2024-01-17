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
import { AddressService } from './address.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddressEntity } from 'src/entities/address.entity';
import { createAddressDto } from './address.type';

@UseGuards(AuthGuard)
@Controller('addresses')
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('createAddress')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AddressEntity,
  })
  async createAddress(
    @Body() newAddress: createAddressDto,
  ): Promise<AddressEntity | HttpException> {
    return await this.addressService.createAddress(newAddress);
  }

  @Get('getAddresses')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: AddressEntity,
  })
  async getAddresses(): Promise<AddressEntity[]> {
    return await this.addressService.getAddresses();
  }

  @Get('getAddressById/:addressId')
  @ApiResponse({
    status: 200,
    description: 'Successfully response',
    type: AddressEntity,
  })
  async getAddressById(
    @Param('addressId') addressId: number,
  ): Promise<AddressEntity | HttpException> {
    const addressFound = await this.addressService.getAddressById(addressId);

    if (!addressFound) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }

    return addressFound;
  }

  @Patch('updateAddress/:addressId')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
    type: AddressEntity,
  })
  async updateAddress(
    @Request() req,
    @Param('addressId') addressId: number,
    @Body() updateAddress: createAddressDto,
  ) {
    /*     if (req.userRole !== (ROLES.SUPER_ADMIN && ROLES.ADMIN)) {
      throw new HttpException(
        'User not enabled to create a specie',
        HttpStatus.UNAUTHORIZED,
      );
    } */

    const address = await this.addressService.getAddressById(addressId);
    if (!address) {
      throw new HttpException(
        `Address with id  ${addressId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    address.name = updateAddress.name;
    address.complementary = updateAddress.complementary;
    address.number = updateAddress.number;
    address.postal_code = updateAddress.postal_code;
    address.province = updateAddress.province;
    address.location = updateAddress.location;

    await this.addressService.updateAddress(address);
  }
}
