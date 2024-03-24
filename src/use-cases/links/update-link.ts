import { ILink } from '../../interfaces/links/create-link-interface'
import { LinksRepositoryInterface } from '../../repositories/interfaces/links-repository-interface'
import { UsersRepositoryInterface } from '../../repositories/interfaces/users-repository-interface'
import { UserNotFoundError } from '../users/errors/user-not-found-error'
import { LinkNotFoundError } from './errors/link-not-found-error'

interface updateLinkUseCaseRequest {
  userId: string
  id: string
  url: string
}

interface updateLinkUseCaseResponse {
  link: ILink | null
}

export class UpdateLinkUseCase {
  constructor(
    private readonly linksRepository: LinksRepositoryInterface,
    private readonly usersRepository: UsersRepositoryInterface,
  ) {}

  async execute({
    id,
    userId,
    url,
  }: updateLinkUseCaseRequest): Promise<updateLinkUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const link = await this.linksRepository.findById(id, user.id)

    if (!link) {
      throw new LinkNotFoundError()
    }

    link.url = url

    const linkUpdated = await this.linksRepository.save(link)

    return { link: linkUpdated }
  }
}
