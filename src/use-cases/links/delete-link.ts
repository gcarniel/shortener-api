import { ILink } from '../../interfaces/links/create-link-interface'
import { LinksRepositoryInterface } from '../../repositories/interfaces/links-repository-interface'
import { UsersRepositoryInterface } from '../../repositories/interfaces/users-repository-interface'
import { UserNotFoundError } from '../users/errors/user-not-found-error'
import { LinkNotFoundError } from './errors/link-not-found-error'

interface deleteLinkUseCaseRequest {
  userId: string
  id: string
}

interface deleteLinkUseCaseResponse {
  link: ILink | null
}

export class DeleteLinkUseCase {
  constructor(
    private readonly linksRepository: LinksRepositoryInterface,
    private readonly usersRepository: UsersRepositoryInterface,
  ) {}

  async execute({
    id,
    userId,
  }: deleteLinkUseCaseRequest): Promise<deleteLinkUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const link = await this.linksRepository.findById(id, user.id)

    if (!link) {
      throw new LinkNotFoundError()
    }

    const deletedLink = await this.linksRepository.deleteLink(id, user.id)

    return { link: deletedLink }
  }
}
