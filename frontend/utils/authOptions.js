import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || "Invalid email or password");
          }

          return data;
        } catch (error) {
          throw new Error(error.message || "Something went wrong");
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
        session.user.id = token.id;
        session.user.token = token.user.token;
        session.user.profilePic = token.profilePic;
        session.user.name = token.name;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user?.id;
        token.user = user;
        token.profilePic = user?.profilePic;
        token.name = user?.name;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
