import { FastifyInstance } from 'fastify'
import { createLink } from './create-link'
import { visitLink } from './visit-link'
import { verifyJwtOptionalUser } from '../../middlewares/verify-jwt-optional-user'

export async function linksRoutes(app: FastifyInstance) {
  app.get('/:code', visitLink)

  app.post('/api/links', { onRequest: [verifyJwtOptionalUser] }, createLink)

  // auth
  app.get('/api/links', async () => {})
  app.patch('/api/links/:id', async () => {})
  app.delete('/api/links/:id', async () => {})
}
