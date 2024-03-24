import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinksRepository } from '../../repositories/in-memory/in-memory-links-repository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { UpdateLinkUseCase } from './update-link'
import { LinkNotFoundError } from './errors/link-not-found-error'
import { UserNotFoundError } from '../users/errors/user-not-found-error'

describe('Update Link Use Case', () => {
  let linkRepository: InMemoryLinksRepository
  let usersRepository: InMemoryUsersRepository
  let sut: UpdateLinkUseCase

  beforeEach(() => {
    linkRepository = new InMemoryLinksRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateLinkUseCase(linkRepository, usersRepository)
  })

  it('should be able update the link url', async () => {
    const user = await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    const resp = await linkRepository.create({
      code: `code12`,
      userId: user.id,
      url: `https://www.google.com`,
    })

    const oldLink = JSON.parse(JSON.stringify(resp))

    const url = 'https://www.youtube.com.br'
    const { link: updateLink } = await sut.execute({
      userId: user.id,
      id: oldLink.id,
      url,
    })

    expect(updateLink?.updatedAt).not.toEqual(oldLink.updatedAt)
    expect(updateLink?.url).not.toEqual(oldLink.url)
    expect(updateLink?.url).toEqual(url)
  })

  it('should not be able update a link that does not exist', async () => {
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
          url: 'https://www.google.com',
        }),
    ).rejects.toBeInstanceOf(LinkNotFoundError)
  })

  it('should not be able update a link that does not belong to the user', async () => {
    expect(
      async () =>
        await sut.execute({
          userId: 'user-2',
          id: 'link-1',
          url: 'https://www.google.com',
        }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
