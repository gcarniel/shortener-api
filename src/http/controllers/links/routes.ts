import { FastifyInstance } from 'fastify'
import { createLink } from './create-link'
import { visitLink } from './visit-link'
import { verifyJwtOptionalUser } from '../../middlewares/verify-jwt-optional-user'
import { listLinks } from './list-links'
import { verifyJwt } from '../../middlewares/verify-jwt'

export async function linksRoutes(app: FastifyInstance) {
  app.get('/:code', visitLink)

  app.post('/api/links', { onRequest: [verifyJwtOptionalUser] }, createLink)

  // auth
  app.get('/api/links', { onRequest: [verifyJwt] }, listLinks)
  app.patch('/api/links/:id', { onRequest: [verifyJwt] }, async () => {})
  app.delete('/api/links/:id', { onRequest: [verifyJwt] }, async () => {})
}
