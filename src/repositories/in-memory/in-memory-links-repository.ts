import { randomUUID } from 'crypto'
import {
  ICreateLinkInput,
  ILink,
} from '../../interfaces/links/create-link-interface'
import { LinksRepositoryInterface } from '../interfaces/links-repository-interface'
import {
  PaginationParams,
  PaginationResult,
} from '../../interfaces/pagination-interface'
import { env } from '../../env'

export class InMemoryLinksRepository implements LinksRepositoryInterface {
  items: ILink[] = []

  async create(data: ICreateLinkInput) {
    const newLink: ILink = {
      id: randomUUID(),
      code: data.code,
      url: data.url,
      shortUrl: data.shortUrl ?? `${env.BASE_URL_API}/${data.code}`,
      userId: data.userId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      visits: data.visits ?? 0,
    }

    this.items.push(newLink)

    return newLink
  }

  async save(data: ILink): Promise<ILink> {
    const index = this.items.findIndex(
      (item) =>
        item.id === data.id &&
        item.deletedAt === null &&
        item.userId === data.userId,
    )

    if (index >= 0) {
      this.items[index].url = data.url
      this.items[index].updatedAt = new Date()
    }
    return this.items[index]
  }

  async findByCode(code: string): Promise<ILink | null> {
    const link = this.items.find(
      (item) => item.code === code && item.deletedAt === null,
    )

    if (!link) {
      return null
    }

    return link
  }

  async increaseVisits(id: string, visits: number): Promise<number> {
    const item = this.items.find((item) => item.id === id)

    if (!item) {
      return 0
    }

    item.visits = visits

    return visits
  }

  async listLinksByUserId(
    userId: string,
    params: PaginationParams,
  ): Promise<PaginationResult<ILink>> {
    const { page = 1, pageSize = 10 } = params

    const itemsByUserId = this.items.filter(
      (item) => item.userId === userId && item.deletedAt === null,
    )

    const items = itemsByUserId.slice((page - 1) * pageSize, page * pageSize)

    return {
      page,
      pages: Math.ceil(itemsByUserId.length / pageSize),
      count: itemsByUserId.length,
      data: items,
    }
  }

  async deleteLink(id: string, userId: string): Promise<ILink | null> {
    const item = this.items.find(
      (item) => item.id === id && item.userId === userId,
    )

    if (!item) return null

    item.deletedAt = new Date()

    return item
  }

  async findById(id: string, userId: string): Promise<ILink | null> {
    const item = this.items.find(
      (item) =>
        item.id === id && item.userId === userId && item.deletedAt === null,
    )

    if (!item) {
      return null
    }

    return item
  }
}
