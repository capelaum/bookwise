import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions, getServerSession } from 'next-auth'
import GithubProvider, { type GithubProfile } from 'next-auth/providers/github'
import GoogleProvider, { type GoogleProfile } from 'next-auth/providers/google'

import { db } from './db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),

  callbacks: {
    session({ session, user }) {
      if (session.user) {
        return {
          ...session,
          user
        }
      }
      return session
    }
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',

      profile(profile: GithubProfile) {
        return {
          id: String(profile.id),
          name: profile.name,
          email: profile.email,
          avatar_url: profile.avatar_url
        }
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      profile(profile: GoogleProfile) {
        return {
          id: String(profile.sub),
          name: profile.name,
          email: profile.email,
          avatar_url: profile.picture
        }
      }
    })
  ]
}

export const getAuthSession = () => getServerSession(authOptions)
