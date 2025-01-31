import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SignIn } from '@/libs/firebase/service';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';

interface User {
	id: string;
	email?: string;
	name?: string;
	phone?: string;
	role?: string;
	password?: string;
}

interface Token {
	email?: string;
	name?: string;
	phone?: string;
	role?: string;
}

interface Session {
	user: {
		email?: string;
		name?: string;
		phone?: string;
		role?: string;
	};
}

if (!process.env.NEXTAUTH_SECRET) {
	throw new Error('NEXTAUTH_SECRET is not defined in environment variables');
}

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
				try {
					if (!credentials) {
						throw new Error('No credentials provided');
					}

					const { email, password } = credentials;
					if (!email || !password) {
						throw new Error('Email and password are required');
					}

					const user = await SignIn(email);
					if (!user) {
						throw new Error('Email not found');
					}

					const passwordMatch = await bcrypt.compare(password, user.password);
					if (!passwordMatch) {
						throw new Error('Incorrect password');
					}

					return user;
				} catch (error) {
					console.error('Error during authorization:', error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.email = user.email;
				token.name = user.name;
				token.phone = user.phone;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			if (token.email) {
				session.user.email = token.email;
			}
			if (token.name) {
				session.user.name = token.name;
			}
			if (token.phone) {
				session.user.phone = token.phone;
			}
			if (token.role) {
				session.user.role = token.role;
			}
			return session;
		},
	},
	pages: {
		signIn: '/auth/login',
	},
};

export default NextAuth(authOptions);
