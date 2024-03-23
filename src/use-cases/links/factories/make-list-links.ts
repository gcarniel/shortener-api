import { PrismaLinksRepository } from '../../../repositories/prisma/prisma-links-repository'
import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { ListLinksUseCase } from '../list-links'

export function makeListLinks() {
  const linksRepository = new PrismaLinksRepository()
  const usersRepository = new PrismaUsersRepository()
  const listLinksUseCase = new ListLinksUseCase(
    linksRepository,
    usersRepository,
  )

  return listLinksUseCase
}
