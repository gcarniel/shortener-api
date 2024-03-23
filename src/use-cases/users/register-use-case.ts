import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { IUser } from '../../interfaces/users/user-interface'
import { UsersRepositoryInterface } from '../../repositories/interfaces/users-repository-interface'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: IUser
}
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    return {
      user,
    }
  }
}
