import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

function envValue(name: string) {
  return process.env[name]?.trim() ?? ""
}

const DEFAULT_ALLOWED_EMAILS = [
  "tilistherconstructionandservic@gmail.com",
  "makoridylan@gmail.com",
  "faithkmutwota@gmail.com",
]

const ALLOWED_EMAILS = Array.from(
  new Set(
    [
      ...DEFAULT_ALLOWED_EMAILS,
      ...(process.env.ALLOWED_EMAILS ?? "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean),
    ].map((email) => email.toLowerCase())
  )
)

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: envValue("GOOGLE_CLIENT_ID"),
      clientSecret: envValue("GOOGLE_CLIENT_SECRET"),
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false
      }

      if (ALLOWED_EMAILS.includes(user.email.toLowerCase())) {
        return true
      }

      console.log(`Access denied for: ${user.email}`)
      return false
    },
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email
      }

      return token
    },
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email as string
      }

      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
