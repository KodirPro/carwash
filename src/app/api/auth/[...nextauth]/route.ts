import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
        return { id: "1", ...credentials };
        try {
          const res = await fetch("http://localhost/kws/hs/Database/DB", {
            headers: {
              Authorization:
                "Basic " +
                Buffer.from(
                  credentials?.name + ":" + credentials?.password
                ).toString("base64"),
            },
          });

          if (res.ok) {
            const revalidate = await fetch("/api/update-page?secret=123");

            if (revalidate.ok) return { id: "1", name: credentials?.name };
            // { user: { name: 'Alex', email: "alex@johnson.com", image: "image.png" } }
          }
        } catch (error) {
          console.error(error);
        }
        return null;
      },
    }),
  ],
  secret: `process.env.NEXTAUTH_SECRET`,
  // jwt: { maxAge: 86400 * 7 + 10 },
  // session: { maxAge: 86400 * 7 },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
