import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register-use-case'

export function makeRegisterUser() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)
  return registerUseCase
}
