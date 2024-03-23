import { ILink } from '../../interfaces/links/create-link-interface'
import { LinksRepositoryInterface } from '../interfaces/links-repository-interface'

export class InMemoryLinksRepository implements LinksRepositoryInterface {
  items: ILink[] = []

  async create(data: ILink) {
    this.items.push(data)

    return data
  }
}
