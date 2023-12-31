import { FastifyInstance } from 'fastify'
import axios from 'axios'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export const authRoutes = async (app: FastifyInstance) => {
  app.post('/auth', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token } = accessTokenResponse.data

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const userSchema = z.object({
      id: z.number(),
      name: z.string(),
      login: z.string(),
      avatar_url: z.string().url(),
    })

    const githubUser = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: {
        githubId: githubUser.id,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: githubUser.id,
          login: githubUser.login,
          name: githubUser.name,
          avatarUrl: githubUser.avatar_url,
        },
      })
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '7 days',
      },
    )

    return {
      token,
    }
  })
}
