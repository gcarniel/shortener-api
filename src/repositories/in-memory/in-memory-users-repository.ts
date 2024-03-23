import { randomUUID } from 'crypto'
import { UsersRepositoryInterface } from '../interfaces/users-repository-interface'
import { IUser, IUserCreateInput } from '../../interfaces/users/user-interface'

export class InMemoryUsersRepository implements UsersRepositoryInterface {
  public items: IUser[] = []

  async create(data: IUserCreateInput): Promise<IUser> {
    const user: IUser = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(userId: string): Promise<IUser | null> {
    const user = this.items.find((item) => item.id === userId)

    if (!user) {
      return null
    }

    return user
  }
}
