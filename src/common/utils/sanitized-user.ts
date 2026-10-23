import { User } from '../../../generated/prisma/client.js';

type SanitizeUser = Omit<User, 'password'>;

export const sanitizeUser = (user: User): SanitizeUser => {
  const { password, ...rest } = user;
  return rest;
};
