import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '../authenticate-use-case'

export function makeAuthenticateUser() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUserUseCase(usersRepository)
  return authenticateUseCase
}
