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
      },
    })
  }
}
