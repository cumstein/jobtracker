import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider  from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      if (!credentials || !credentials.email || !credentials.password) {
        throw new Error("Email and password must be provided");
      }
      const user = await prisma.user.findFirst({
        where: { email: credentials.email }
      });

      if (!user || !user.hashedPassword) {
        throw new Error("No user found or password not set");
      }

      const isValid = await compare(credentials.password, user.hashedPassword);
      if (!isValid) {
        throw new Error("Invalid password");
      }

      return user;
    }
  })
],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database" as const,
  },
  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
