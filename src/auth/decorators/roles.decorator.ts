import { SetMetadata } from '@nestjs/common';
import type { ROLE } from '../../../generated/prisma/enums.js';

export const ROLES_KEY = 'roles';

/** Allow any of the listed roles. Use with AuthGuard followed by RolesGuard. */
export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);
 