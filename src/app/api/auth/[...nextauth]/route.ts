import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Login", type: "text", placeholder: "Login" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user`, {
            headers: {
              Authorization:
                "Basic " +
                Buffer.from(
                  credentials?.name + ":" + credentials?.password,
                ).toString("base64"),
            },
          });

          if (res.ok) {
            const user = await res.json();

            return user;
          }
        } catch (error) {
          console.error(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async redirect() {
      return "/api/update-page";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: { maxAge: 86400 * 7 },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
