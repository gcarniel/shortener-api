import { randomUUID } from 'crypto'
import {
  ICreateLinkInput,
  ILink,
} from '../../interfaces/links/create-link-interface'
import { LinksRepositoryInterface } from '../interfaces/links-repository-interface'

export class InMemoryLinksRepository implements LinksRepositoryInterface {
  items: ILink[] = []

  async create(data: ICreateLinkInput) {
    const newLink: ILink = {
      id: randomUUID(),
      code: data.code,
      url: data.url,
      shortUrl: data.shortUrl!,
      userId: data.userId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      visits: 0,
    }

    this.items.push(newLink)

    return newLink
  }

  async findByCode(code: string): Promise<ILink | null> {
    const link = this.items.find((item) => item.code === code)

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
}
