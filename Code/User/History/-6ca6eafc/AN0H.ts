import { DefaultSession, NextAuthOptions, User as NextAuthUser, DefaultUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SignIn } from '@/libs/firebase/service';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';

interface CustomUser extends NextAuthUser {
	id: string;
	email: string;
	name?: string;
	phone?: string;
	role?: string;
	password?: string;
}

declare module 'next-auth' {
	interface User extends DefaultUser {
		id: string;
		phone?: string;
		role?: string;
	}
	interface Session extends DefaultSession {
		user: {
			id: string;
			email: string;
			name?: string;
			phone?: string;
			role?: string;
		};
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		email?: string;
		name?: string;
		phone?: string;
		role?: string;
	}
}

interface CustomToken extends Record<string, unknown> {
	id: string;
	email?: string;
	name?: string;
	phone?: string;
	role?: string;
}

if (!process.env.NEXTAUTH_SECRET) {
	throw new Error('NEXTAUTH_SECRET is not defined in environment variables');
}

export const authOptions: NextAuthOptions = {
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

					const user = (await SignIn(email)) as CustomUser | null;
					if (!user) {
						throw new Error('No user found with the provided email');
					}

					if (!user.password) {
						throw new Error('User password is missing in database');
					}

					const passwordMatch = await bcrypt.compare(password, user.password);
					if (!passwordMatch) {
						throw new Error('Invalid credentials');
					}

					delete user.password;
					return user;
				} catch (error) {
					console.error('Error during authorization:', error);
					throw new Error('Authentication failed');
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }): Promise<CustomToken> {
			if (user) {
				const customUser = user as CustomUser;
				token.id = customUser.id;
				token.email = customUser.email;
				token.name = customUser.name;
				token.phone = customUser.phone;
				token.role = customUser.role;
			}
			return token as CustomToken;
		},
		async session({ session, token }) {
			session.user = {
				id: token.id!,
				email: token.email ?? '',
				name: token.name,
				phone: token.phone,
				role: token.role,
			};
			return session;
		},
	},
	pages: {
		signIn: '/auth/login',
	},
	debug: true, // Aktifkan debug
};

export default NextAuth(authOptions);
