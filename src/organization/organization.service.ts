import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service.js';
import {
  CreateOrganizationCategoryDto,
  CreateOrganizationDto,
} from './dto/CreateOrganizationDto.js';
import { OrganizationRole } from '../../generated/prisma/enums.js';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOrganizationCategory() {
    return this.prisma.organizationCategory.findMany({});
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
    return this.prisma.organizationCategory.delete({
      where: {
        id: orgCategoryId,
      },
    });
  }

  async createOrganization(data: CreateOrganizationDto) {
    const organizationCategory =
      await this.prisma.organizationCategory.findUnique({
        where: {
          id: data.organizationCategoryId,
        },
      });

    if (!organizationCategory) {
      throw new NotFoundException('Organization category not found');
    }

    const isSlugExists = await this.prisma.organization.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (isSlugExists) {
      throw new ConflictException('Organization slug already exists');
    }

    return this.prisma.organization.create({
      data: {
        orgName: data.name,
        slug: data.slug,
        organizationCategoryId: data.organizationCategoryId,
        description: data.description,
        timeZone: data?.timeZone,
        currency: data?.currency,
        locale: data?.locale,
        status: data.status,
      },
    });
  }

  // organziation memebership
  async createOrganizationMembership(
    organizationId: string,
    userId: string,
    role: OrganizationRole,
  ) {
    const organization = await this.prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
    });

    const user = await this.prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return this.prisma.organizationMembership.create({
      data: {
        organizationId,
        userId,
        role,
      },
    });
  }
}
