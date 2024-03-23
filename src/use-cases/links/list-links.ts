import { ILink } from '../../interfaces/links/create-link-interface'
import {
  PaginationParams,
  PaginationResult,
} from '../../interfaces/pagination-interface'
import { LinksRepositoryInterface } from '../../repositories/interfaces/links-repository-interface'
import { UsersRepositoryInterface } from '../../repositories/interfaces/users-repository-interface'
import { LinkNotAllowedError } from './errors/link-not-allowed-error'

export interface ListLinksUseCaseRequest {
  userId: string
  params: PaginationParams
}

export interface ListLinksUseCaseResponse extends PaginationResult<ILink> {}

export class ListLinksUseCase {
  constructor(
    private readonly linksRepository: LinksRepositoryInterface,
    private readonly usersRepository: UsersRepositoryInterface,
  ) {}

  async execute({
    userId,
    params,
  }: ListLinksUseCaseRequest): Promise<ListLinksUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new LinkNotAllowedError()
    }

    const data = await this.linksRepository.listLinksByUserId(user.id, params)

    return {
      page: data.page,
      pages: data.pages,
      count: data.count,
      data: data.data,
    }
  }
}
