import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinksRepository } from '../../repositories/in-memory/in-memory-links-repository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { DeleteLinkUseCase } from './delete-link'
import { UserNotFoundError } from '../users/errors/user-not-found-error'
import { LinkNotFoundError } from './errors/link-not-found-error'

describe('Delete Link Use Case', () => {
  let linkRepository: InMemoryLinksRepository
  let usersRepository: InMemoryUsersRepository
  let sut: DeleteLinkUseCase

  beforeEach(() => {
    linkRepository = new InMemoryLinksRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteLinkUseCase(linkRepository, usersRepository)
  })

  it('should be able to list the links on page 2', async () => {
    const user = await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    const link = await linkRepository.create({
      code: `code12`,
      userId: user.id,
      url: `https://www.google.com`,
    })

    const { link: deletedLink } = await sut.execute({
      userId: 'user-1',
      id: link.id,
    })

    expect(deletedLink?.deletedAt).not.toBeNull()
  })

  it('should not be able to delete a link that does not exist', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    expect(
      async () =>
        await sut.execute({
          userId: 'user-1',
          id: 'link-1',
        }),
    ).rejects.toBeInstanceOf(LinkNotFoundError)
  })

  it('should not be able to delete a link that does not belong to the user', async () => {
    expect(
      async () =>
        await sut.execute({
          userId: 'user-2',
          id: 'link-1',
        }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
