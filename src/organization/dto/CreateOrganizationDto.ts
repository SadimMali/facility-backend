export class CreateOrganizationCategoryDto {
  name: string;
}

export class CreateOrganizationDto {
  name: string;
  slug: string;
  organizationCategoryId: string;
  description?: string;
  timeZone?: string;
  currency?: string;
  locale?: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED';

}
