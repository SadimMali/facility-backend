import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service.js';
import { CreateOrganizationCategoryDto } from './dto/CreateOrganizationDto.js';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}
  async createOrganizationCategory(payload: CreateOrganizationCategoryDto) {
    const { name } = payload;
    return await this.prisma.organizationCategory.create({
      data: {
        name,
      },
    });
  }
}
