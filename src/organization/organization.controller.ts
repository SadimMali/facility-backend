import { Body, Controller, Post } from '@nestjs/common';
import { OrganizationService } from './organization.service.js';
import { CreateOrganizationCategoryDto } from './dto/CreateOrganizationDto.js';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}
  @Post('category')
  createOrganizationCategory(@Body() body: CreateOrganizationCategoryDto) {
    return this.organizationService.createOrganizationCategory(body);
  }
}
