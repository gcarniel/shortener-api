import {
  ICreateLinkInput,
  ILink,
} from '../../interfaces/links/create-link-interface'
import { prisma } from '../../lib/prisma'
import { LinksRepositoryInterface } from '../interfaces/links-repository-interface'

export class PrismaLinksRepository implements LinksRepositoryInterface {
  async create(data: ICreateLinkInput): Promise<ILink> {
    return await prisma.links.create({
      data: {
        code: data.code,
        url: data.url,
        shortUrl: data.shortUrl,
        userId: data.userId || null,
      },
    })
  }

  async findByCode(code: string): Promise<ILink | null> {
    return await prisma.links.findFirst({
      where: {
        code,
      },
    })
  }

  async increaseVisits(id: string, visits: number): Promise<number> {
    const { visits: count } = await prisma.links.update({
      where: {
        id,
      },
      data: {
        visits,
      },
      select: {
        visits: true,
      },
    })

    return count
  }
}
