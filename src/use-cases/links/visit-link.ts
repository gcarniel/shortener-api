import { ILink } from '../../interfaces/links/create-link-interface'
import { LinksRepositoryInterface } from '../../repositories/interfaces/links-repository-interface'
import { LinkNotFoundError } from './errors/link-not-found'

interface VisitLinkUseCaseRequest {
  code: string
}

interface VisitLinkUseCaseResponse {
  link: ILink
}
export class VisitLinkUseCase {
  constructor(private readonly linksRepository: LinksRepositoryInterface) {}

  async execute({
    code,
  }: VisitLinkUseCaseRequest): Promise<VisitLinkUseCaseResponse> {
    const link = await this.linksRepository.findByCode(code)

    if (!link) {
      throw new LinkNotFoundError()
    }

    const count = await this.increaseVisits(link)

    const linkUpdated = {
      ...link,
      visits: count,
    }

    return { link: linkUpdated }
  }

  private async increaseVisits(link: ILink): Promise<number> {
    const visits = link.visits + 1

    const count = await this.linksRepository.increaseVisits(link.id, visits)

    return count
  }
}
