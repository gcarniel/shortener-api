import { PrismaLinksRepository } from '../../../repositories/prisma/prisma-links-repository'
import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { UpdateLinkUseCase } from '../update-link'

export function makeUpdateLink() {
  const linksRepository = new PrismaLinksRepository()
  const usersRepository = new PrismaUsersRepository()
  const updateLink = new UpdateLinkUseCase(linksRepository, usersRepository)

  return updateLink
}
