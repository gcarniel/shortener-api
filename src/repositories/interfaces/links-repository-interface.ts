import {
  ICreateLinkInput,
  ILink,
} from '../../interfaces/links/create-link-interface'

export interface LinksRepositoryInterface {
  create(data: ICreateLinkInput): Promise<ILink>
  findByCode(code: string): Promise<ILink | null>
  increaseVisits(id: string, visits: number): Promise<number>
}
