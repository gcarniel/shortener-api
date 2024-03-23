import { Links, Prisma } from '@prisma/client'

export interface ILink extends Links {}
export interface ICreateLinkInput extends Prisma.LinksUncheckedCreateInput {}
