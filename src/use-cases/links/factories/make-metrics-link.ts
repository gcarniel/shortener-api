import { PrismaLinksRepository } from '../../../repositories/prisma/prisma-links-repository'
import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { MetricsLinkUseCase } from '../metrics-link'

export function makeMetricsLink() {
  const linksRepository = new PrismaLinksRepository()
  const usersRepository = new PrismaUsersRepository()
  const metricsLink = new MetricsLinkUseCase(linksRepository, usersRepository)

  return metricsLink
}
