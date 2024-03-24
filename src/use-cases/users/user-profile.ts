import { User } from '@prisma/client'
import { UsersRepositoryInterface } from '../../repositories/interfaces/users-repository-interface'
import { UserNotFoundError } from './errors/user-not-found-error'

interface UserProfileUseCaseRequest {
  userId: string
}

interface UserProfileUseCaseResponse {
  user: User
}

export class UserProfileUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    userId,
  }: UserProfileUseCaseRequest): Promise<UserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    return { user }
  }
}
