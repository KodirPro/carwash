import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "login" },
        password: { label: "Password", type: "password" , placeholder: "password"}
      },
      async authorize(credentials) {
        try {
          const res = await fetch("http://localhost/kws/hs/Database/DB", {
            headers: {
              Authorization:
                "Basic " +
                Buffer.from(credentials?.username+":"+credentials?.password).toString("base64"),
            },
          });

          // const data = await res.json();

          if (res.ok) return { id: "1", ...credentials };
        } catch (error) {
          console.error(error);
        }
        return null;  

      },
    }),
  ],
  callbacks: {
    signIn: async ({ account }) => {
      if (account?.provider === "credentials") return true;

      return false;
    },
  },
  secret: `process.env.NEXTAUTH_SECRET`,
  jwt: { maxAge: 86400 * 7 + 10 },
  session: { maxAge: 86400 * 7 },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
