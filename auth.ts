import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      async authorize(credentials) {
        if (credentials?.token) {
          return credentials;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt(props) {
      const token: { user: any } = props;
      if (token.user) {
        token.user = token.user;
      }
      return token;
    },
    async session(props: any) {
      const { session, user }: any = props;
      if (props.token?.token?.user) {
        session.user = props.token.token.user;
      }
      return session;
    },
  },
});
