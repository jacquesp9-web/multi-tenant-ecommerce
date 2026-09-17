import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /* Finding User by Email */
  findByEmail(email: string) {
    const data = this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return data;
  }

  /* Finding User by ID */
  findById(id: string) {
    const data = this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return data;
  }

  /* update user account information */
  async update(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        fullName: data?.fullName,
        email: data?.email,
        phone: data?.phone,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
      },
    });

    return {
      success: true,
      message: 'User Account Profile Update Successfully',
      data: user,
    };
  }
}
