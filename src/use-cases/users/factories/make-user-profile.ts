import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { UserProfileUseCase } from '../user-profile'

export function makeUserProfile() {
  const usersRepository = new PrismaUsersRepository()
  const userProfile = new UserProfileUseCase(usersRepository)

  return userProfile
}
