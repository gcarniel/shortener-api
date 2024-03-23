import {
  ICreateLinkInput,
  ILink,
} from '../../interfaces/links/create-link-interface'

export interface LinksRepositoryInterface {
  create(data: ICreateLinkInput): Promise<ILink>
}
