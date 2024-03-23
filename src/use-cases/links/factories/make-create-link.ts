import { PrismaLinksRepository } from '../../../repositories/prisma/prisma-links-repository'
import { CreateLinkUseCase } from '../create-link'

export function makeCreateLink() {
  const linksRepository = new PrismaLinksRepository()
  const createLink = new CreateLinkUseCase(linksRepository)

  return createLink
}
