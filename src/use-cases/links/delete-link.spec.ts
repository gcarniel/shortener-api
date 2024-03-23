import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinksRepository } from '../../repositories/in-memory/in-memory-links-repository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { DeleteLinkUseCase } from './delete-link'

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
})
