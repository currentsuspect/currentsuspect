import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// List of allowed emails (whitelist)
const ALLOWED_EMAILS = [
  "tilistherconstructionandservic@gmail.com",
  "makoridylan@gmail.com", 
  "99niccur@gmail.com",
  "darealgopher@gmail.com" // You can add more here later
]

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Check if user's email is in the whitelist
      if (user.email && ALLOWED_EMAILS.includes(user.email.toLowerCase())) {
        return true
      } else {
        // Return false to deny access
        console.log(`Access denied for: ${user.email}`)
        return false // Will redirect to an error page by default
      }
    }
  },
  pages: {
    signIn: '/login',
    error: '/login?error=AccessDenied', // Redirect to login with error if not whitelisted
  },
  session: {
    strategy: "jwt",
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }