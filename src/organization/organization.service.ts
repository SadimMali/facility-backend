import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service.js';
import { CreateOrganizationCategoryDto } from './dto/CreateOrganizationDto.js';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllOrganizationCategory() {
    return await this.prisma.organizationCategory.findMany({});
  }
  async createOrganizationCategory(payload: CreateOrganizationCategoryDto) {
    const { name } = payload;
    return await this.prisma.organizationCategory.create({
      data: {
        name,
      },
    });
  }
  async deleteOrganizationCategory(orgCategoryId: string) {
    return await this.prisma.organizationCategory.delete({
      where: {
        id: orgCategoryId,
      },
    });
  }
}
