import { NextAuthOptions, User as NextAuthUser } from 'next-auth';
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

interface CustomToken {
	email?: string;
	name?: string;
	phone?: string;
	role?: string;
}

interface CustomSession {
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

					const user = (await SignIn(email)) as CustomUser | null;
					if (!user) {
						throw new Error('Email not found');
					}

					if (!user.password) {
						throw new Error('User password is missing in database');
					}

					const passwordMatch = await bcrypt.compare(password, user.password);
					if (!passwordMatch) {
						throw new Error('Incorrect password');
					}

					// Remove sensitive information before returning the user object
					delete user.password;
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
				const customUser = user as CustomUser;
				token.email = customUser.email;
				token.name = customUser.name;
				token.phone = customUser.phone;
				token.role = customUser.role;
			}
			return token as CustomToken;
		},
		async session({ session, token }) {
			const customToken = token as CustomToken;
			if (customToken.email) {
				session.user.email = customToken.email;
			}
			if (customToken.name) {
				session.user.name = customToken.name;
			}
			if (customToken.phone) {
				session.user.phone = customToken.phone;
			}
			if (customToken.role) {
				session.user.role = customToken.role;
			}
			return session as CustomSession;
		},
	},
	pages: {
		signIn: '/auth/login',
	},
};

export default NextAuth(authOptions);
