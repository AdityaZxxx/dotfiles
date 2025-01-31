import NextAuth, { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { firestore } from '@/libs/firebase/service';

declare module 'next-auth' {
	interface Session {
		user: {
			email?: string | null;
			name?: string | null;
			role?: string | null;
		};
	}
}

interface User extends NextAuthUser {
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
	secret: process.env.NEXTAUTH_SECRET, // Pastikan sudah didefinisikan di .env

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

				// Pengecekan untuk pengguna Firestore
				const userQuery = query(collection(firestore, 'users'), where('email', '==', email));
				const snapshot = await getDocs(userQuery);

				if (!snapshot.empty) {
					// Jika email ditemukan, validasi password
					const userData = snapshot.docs[0].data();
					const isPasswordValid = await bcrypt.compare(password, userData.password);

					if (isPasswordValid) {
						return {
							id: snapshot.docs[0].id || '',
							email: userData.email,
							name: userData.name,
							role: userData.role || 'guest', // Jika role tidak ada, default ke 'guest'
						};
					} else {
						throw new Error('Invalid credentials');
					}
				} else {
					throw new Error('User not found');
				}
			},
		}),
	],

	callbacks: {
		// Menambahkan data tambahan ke token
		async jwt({ token, user }) {
			if (user) {
				token.email = user.email;
				token.name = user.name;
				token.role = (user as User).role; // Pastikan role ada di sini
			}
			return token;
		},

		// Menambahkan data tambahan ke session
		async session({ session, token }) {
			session.user = {
				...session.user,
				email: token.email,
				name: token.name as string | null,
				role: token.role as string | null | undefined, // Pastikan role diteruskan ke session
			};
			return session;
		},

		// Redirect pengguna setelah login
		async redirect({ url, baseUrl, token }: { url: string; baseUrl: string; token?: { role?: string } }) {
			// Cek apakah URL sudah ditentukan atau arahkan ke default
			if (url) {
				return url;
			}

			// Pastikan role ada dalam token
			if (token?.role === 'admin') {
				return `${baseUrl}/admin`; // Redirect ke /admin
			} else if (token?.role === 'member') {
				return `${baseUrl}/articles`; // Redirect ke /articles
			}

			// Redirect ke halaman utama jika role tidak ditemukan
			return `${baseUrl}/`;
		},
	},

	// Halaman custom untuk sign-in
	pages: {
		signIn: '/auth/login', // Halaman login
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
