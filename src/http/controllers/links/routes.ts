import { FastifyInstance } from 'fastify'
import { createLink } from './create-link'

export async function linksRoutes(app: FastifyInstance) {
  app.get('/:code', async () => {})

  app.post('/api/links', createLink)

  // auth
  app.get('/api/links', async () => {})
  app.patch('/api/links/:id', async () => {})
  app.delete('/api/links/:id', async () => {})
}
