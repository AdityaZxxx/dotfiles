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

				// Cek apakah pengguna adalah admin
				const adminEmail = process.env.NEXT_ADMIN_EMAIL;
				const adminPassword = process.env.NEXT_ADMIN_PASSWORD;

				if (email === adminEmail && password === adminPassword) {
					return {
						id: process.env.NEXT_ADMIN_ID || '',
						name: process.env.NEXT_ADMIN_NAME,
						email: adminEmail,
						role: process.env.NEXT_ADMIN_ROLE,
					};
				}

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
							fullname: userData.fullname,
							role: userData.role,
						};
					}
				}

				// Jika password salah
				throw new Error('CredentialsSignin');
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
		async redirect({ url, baseUrl, token }: { url: string; baseUrl: string; token?: { role?: string } }) {
			// Menggunakan session untuk menentukan role
			if (url) {
				return url; // Jika ada URL yang disertakan oleh klien, arahkan ke URL tersebut
			}

			// Menggunakan token untuk pengalihan berdasarkan role
			if (token?.role === 'admin') {
				return `${baseUrl}/admin`; // Redirect ke /admin
			} else if (token?.role === 'member') {
				return `${baseUrl}/articles`; // Redirect ke /member
			}

			return `${baseUrl}/`; // Redirect ke halaman utama
		},
	},

	// Halaman custom untuk sign-in
	pages: {
		signIn: '/auth/sign-in', // Halaman login
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
