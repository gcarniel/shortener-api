import {
  ICreateLinkInput,
  ILink,
} from '../../interfaces/links/create-link-interface'
import {
  PaginationParams,
  PaginationResult,
} from '../../interfaces/pagination-interface'
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

  async listLinksByUserId(
    userId: string,
    params: PaginationParams,
  ): Promise<PaginationResult<ILink>> {
    const { page = 1, pageSize = 10 } = params

    const linksPromise = prisma.links.findMany({
      where: {
        userId,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    })

    const countPromise = prisma.links.count({
      where: {
        userId,
      },
    })

    const [links, count] = await Promise.all([linksPromise, countPromise])

    return {
      page,
      pages: Math.ceil(links.length / pageSize),
      count,
      data: links,
    }
  }
}
