import { compare } from 'bcryptjs'
import { IUser } from '../../interfaces/users/user-interface'
import { UsersRepositoryInterface } from '../../repositories/interfaces/users-repository-interface'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: IUser
}
export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isPasswordMatch = await compare(password, user.password)

    if (!isPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
