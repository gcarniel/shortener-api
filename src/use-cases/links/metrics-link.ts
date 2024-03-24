import { LinksRepositoryInterface } from '../../repositories/interfaces/links-repository-interface'
import { UsersRepositoryInterface } from '../../repositories/interfaces/users-repository-interface'
import { LinkNotFoundError } from './errors/link-not-found-error'

interface metricsLinkRequest {
  code: string
  userId?: string | null
}

interface metricsLinkResponse {
  visits: number
  createdAt: Date
  updatedAt: Date
}
export class MetricsLinkUseCase {
  constructor(
    private readonly linksRepository: LinksRepositoryInterface,
    private readonly usersRepository: UsersRepositoryInterface,
  ) {}

  async execute({
    code,
    userId,
  }: metricsLinkRequest): Promise<metricsLinkResponse> {
    const link = await this.linksRepository.findByCode(code)

    if (!link) {
      throw new LinkNotFoundError()
    }

    if (link.userId && link.userId !== userId) {
      throw new LinkNotFoundError()
    }

    if (link.userId) {
      const user = await this.usersRepository.findById(link.userId)

      if (!user) {
        throw new LinkNotFoundError()
      }
    }

    return {
      visits: link.visits,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
    }
  }
}
