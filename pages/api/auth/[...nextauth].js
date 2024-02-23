import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    signIn: async ({ account, profile }) => {
      if (
        account.provider === "google" &&
        profile.email_verified === true &&
        profile.email.endsWith("@wizeline.com")
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
});

export default handler;
