import { PrismaLinksRepository } from '../../../repositories/prisma/prisma-links-repository'
import { VisitLinkUseCase } from '../visit-link'

export function makeVisitLink() {
  const linksRepository = new PrismaLinksRepository()
  const visitLink = new VisitLinkUseCase(linksRepository)

  return visitLink
}
