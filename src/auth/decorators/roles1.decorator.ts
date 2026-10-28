import { SetMetadata } from '@nestjs/common';
import { ROLE } from '../../../generated/prisma/enums.js';

const ROLES_KEY = 'roles';

export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);
