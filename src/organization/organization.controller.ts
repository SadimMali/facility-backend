import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrganizationService } from './organization.service.js';
import {
  CreateOrganizationCategoryDto,
  CreateOrganizationDto,
} from './dto/CreateOrganizationDto.js';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}
  @Post('category')
  createOrganizationCategory(@Body() body: CreateOrganizationCategoryDto) {
    return this.organizationService.createOrganizationCategory(body);
  }

  @Get('category')
  getAllOrganizationCategory() {
    return this.organizationService.getAllOrganizationCategory();
  }

  @Delete('category/:id')
  deleteOrganizationCategory(@Param('id') orgCategoryId: string) {
    return this.organizationService.deleteOrganizationCategory(orgCategoryId);
  }

  @Post('')
  createOrganization(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.createOrganization(createOrganizationDto);
  }
}
