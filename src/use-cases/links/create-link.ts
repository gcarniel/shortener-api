import { randomUUID } from 'crypto'
import { ILink } from '../../interfaces/links/create-link-interface'
import { LinksRepositoryInterface } from '../../repositories/interfaces/links-repository-interface'
import { env } from '../../env'
import { isValidUrl } from '../../utils/validator-url'
import { InvalidUrlError } from './errors/invalid-url-error'

interface LinkUseCaseRequest {
  url: string
  userId?: string | null
}

interface LinkUseCaseResponse {
  link: ILink
}
export class CreateLinkUseCase {
  constructor(private readonly linksRepository: LinksRepositoryInterface) {}

  async execute({
    url,
    userId,
  }: LinkUseCaseRequest): Promise<LinkUseCaseResponse> {
    const code = randomUUID().slice(0, 6)
    const shortUrl = `${env.BASE_URL_API}/${code}`

    if (!isValidUrl(url)) {
      throw new InvalidUrlError()
    }

    if (!isValidUrl(shortUrl)) {
      throw new InvalidUrlError('Invalid short url')
    }

    const link = await this.linksRepository.create({
      code,
      url,
      shortUrl,
      userId,
    })

    return { link }
  }
}
