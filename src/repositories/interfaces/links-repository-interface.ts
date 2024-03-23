import {
  ICreateLinkInput,
  ILink,
} from '../../interfaces/links/create-link-interface'
import {
  PaginationParams,
  PaginationResult,
} from '../../interfaces/pagination-interface'

export interface LinksRepositoryInterface {
  create(data: ICreateLinkInput): Promise<ILink>
  findByCode(code: string): Promise<ILink | null>
  increaseVisits(id: string, visits: number): Promise<number>
  listLinksByUserId(
    userId: string,
    params: PaginationParams,
  ): Promise<PaginationResult<ILink>>
}
