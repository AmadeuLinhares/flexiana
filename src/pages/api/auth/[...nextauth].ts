/* eslint-disable no-param-reassign */
import NextAuth, { Session } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

interface CustomSession extends Session {
  accessToken: string;
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? ``,
      clientSecret: process.env.GITHUB_SECRET ?? ``,
    }),
  ],
  jwt: {},
  callbacks: {
    async signIn() {
      return true;
    },
    async redirect() {
      return `/users`;
    },
    async session({ session, token }) {
      const customSession: CustomSession = {
        ...session,
        accessToken: token.accessToken as string,
      };
      //   session.accessToken = token.accessToken;

      return customSession;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
});
