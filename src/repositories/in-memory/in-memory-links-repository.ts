import { randomUUID } from 'crypto'
import { ILink } from '../../interfaces/links/create-link-interface'
import { LinksRepositoryInterface } from '../interfaces/links-repository-interface'

export class InMemoryLinksRepository implements LinksRepositoryInterface {
  items: ILink[] = []

  async create(data: ILink) {
    const newLink: ILink = {
      id: randomUUID(),
      code: data.code,
      url: data.url,
      shortUrl: data.shortUrl,
      userId: data.userId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      visits: 0,
    }

    this.items.push(newLink)

    return newLink
  }
}
