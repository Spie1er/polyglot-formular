import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'
import { prisma } from './prisma/prisma'
import bcrypt from 'bcryptjs'

type credentials = {
  email?: string
  password?: string
}

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      async authorize(credentials: credentials) {
        const { email, password } = credentials
        if (!credentials.email || !credentials.password) return null

        const user = await prisma.user.findFirst({
          where: {
            email: email
          }
        })

        if (!user || !user.password || !user.email) {
          return null
        }

        const passwordsMatch = await bcrypt.compare(
          password as string,
          user.password
        )

        if (passwordsMatch) {
          return user
        }

        return null
      }
    })
  ]
} satisfies NextAuthConfig
