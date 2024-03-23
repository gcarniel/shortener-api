import { PrismaLinksRepository } from '../../../repositories/prisma/prisma-links-repository'
import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { DeleteLinkUseCase } from '../delete-link'

export function makeDeleteLink() {
  const linksRepository = new PrismaLinksRepository()
  const usersRepository = new PrismaUsersRepository()
  const deleteLinkUseCase = new DeleteLinkUseCase(
    linksRepository,
    usersRepository,
  )

  return deleteLinkUseCase
}
