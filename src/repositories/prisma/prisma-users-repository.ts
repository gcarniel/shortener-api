import { IUser, IUserCreateInput } from '../../interfaces/users/user-interface'
import { prisma } from '../../lib/prisma'
import { UsersRepositoryInterface } from '../interfaces/users-repository-interface'

export class PrismaUsersRepository implements UsersRepositoryInterface {
  async create(data: IUserCreateInput): Promise<IUser> {
    const user = await prisma.user.create({ data })

    return user
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(userId: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    return user
  }
}
