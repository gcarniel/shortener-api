import { Prisma, User } from '@prisma/client'

export interface IUser extends User {}
export interface IUserCreateInput extends Prisma.UserCreateInput {}
