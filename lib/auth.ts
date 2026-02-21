import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id; // Add user id to the token
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id; // Add user id to the session object exposed to the client
      }
      return session;
    },
  },
});
