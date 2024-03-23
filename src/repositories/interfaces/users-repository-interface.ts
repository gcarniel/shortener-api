import { IUser, IUserCreateInput } from '../../interfaces/users/user-interface'

export interface UsersRepositoryInterface {
  create(data: IUserCreateInput): Promise<IUser>
  findByEmail(email: string): Promise<IUser | null>
  findById(userId: string): Promise<IUser | null>
}
