import NextAuth, { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { firestore } from '@/lib/firebase/init'; // File inisialisasi Firestore Anda

declare module 'next-auth' {
	interface Session {
		user: {
			email?: string | null;
			fullname?: string | null;
			role?: string | null;
		};
	}
}

interface User extends NextAuthUser {
	fullname?: string | null;
	email?: string | null;
	password?: string | null;
	role?: string | null;
}

const authOptions: NextAuthOptions = {
	// Gunakan JWT untuk session
	session: {
		strategy: 'jwt',
	},

	// Rahasia untuk keamanan NextAuth
	secret: process.env.NEXT_AUTH_SECRET,

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

				// Admin Login
				const admin: { id: string; name: string; email: string; role: string } = {
					id: '1',
					name: 'Aditya',
					email: 'aditya@gmail.com',
					role: 'admin',
				};

				if (email === admin.email && password === 'aditya') {
					return admin;
				}

				// Member Login (dari Firestore)
				const userQuery = query(collection(firestore, 'users'), where('email', '==', email));
				const snapshot = await getDocs(userQuery);

				if (!snapshot.empty) {
					const userData = snapshot.docs[0].data();

					// Validasi password
					const isPasswordValid = await bcrypt.compare(password, userData.password);
					if (isPasswordValid) {
						return {
							id: snapshot.docs[0].id,
							email: userData.email,
							fullname: userData.fullname,
							role: userData.role,
						};
					}
				}

				// Jika kredensial tidak valid
				return null;
			},
		}),
	],

	callbacks: {
		// Menambahkan data tambahan ke token
		async jwt({ token, user }) {
			if (user) {
				token.email = user.email;
				token.fullname = (user as User).fullname;
				token.role = (user as User).role;
			}
			return token;
		},

		// Menambahkan data tambahan ke session
		async session({ session, token }) {
			session.user = {
				...session.user,
				email: token.email,
				fullname: token.fullname as string | null,
				role: token.role as string | null | undefined,
			};
			return session;
		},

		// Redirect pengguna setelah login
		async redirect({ baseUrl, url, token }) {
			if (token?.role === 'admin') {
				return '/admin';
			} else {
				return '/articles';
			}
		},
	},

	// Halaman custom untuk sign-in
	pages: {
		signIn: '/auth/sign-in', // Halaman login
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
