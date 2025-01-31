import { SignIn } from '@/libs/firebase/service';
import { NextAuthOptions } from 'next-auth';
import { CredentialsProvider } from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			type: 'credentials',
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const { email, password } = credentials as { email: string; password: string };

				const user = await SignIn(email);

				if (user) {
					const passwordMatch = await bcrypt.compare(password, user.password);
					if (passwordMatch) {
						return user;
					} else {
						return null;
					}
				} else {
					return null;
				}
			},
		}),
	],
    callbacks: {
        async jwt({ token, account, profile, user }) {
            if (account?.provider === 'credentials') {
                token.email = user.email;
                token.name = user.name;
                token.phone = user.phone;
                token.role = user.role;                
            }
            return token;
        } 
        async session({ session, token }) {
            if ('email' in token) {
                session.user.email = token.email as string;
            }
            if ('name' in token) {
                session.user.name = token.name as string;
            }
            if ('phone' in token) {
                session.user.phone = token.phone as string;
            }
            if ('role' in token) {
                session.user.role = token.role as string;
            }
            return session;
        }
    },
    pages: {    
        signIn: '/auth/login',
};
