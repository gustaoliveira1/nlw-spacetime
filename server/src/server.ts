import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'

import { memoryRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'hqroghwfogquhrhcgoqwfqpigbri',
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoryRoutes)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server is running on http://localhost:3333')
})
