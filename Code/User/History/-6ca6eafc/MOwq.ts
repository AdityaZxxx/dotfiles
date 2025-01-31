import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getDocs, query, where, collection, getFirestore } from 'firebase/firestore';
import bcrypt from 'bcrypt';
import app from '@/libs/firebase/init';
const firestore = getFirestore(app);

// Fungsi untuk memverifikasi password menggunakan bcrypt
interface UserData {
	password: string;
}

async function verifyPassword(userData: UserData, password: string): Promise<boolean> {
	try {
		return await bcrypt.compare(password, userData.password);
	} catch (error) {
		console.error('Error verifying password:', error);
		return false;
	}
}

// Fungsi untuk menangani login menggunakan Firebase Firestore
export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();

		// Cek apakah email dan password sudah ada
		if (!email || !password) {
			return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
		}

		// Cari user berdasarkan email di Firestore
		const q = query(collection(firestore, 'users'), where('email', '==', email));
		const snapshot = await getDocs(q);

		if (snapshot.empty) {
			// Jika user tidak ditemukan
			return NextResponse.json({ message: 'Email not found' }, { status: 404 });
		}

		// Ambil data user dari Firestore (hanya mengambil dokumen pertama yang cocok)
		const userDoc = snapshot.docs[0];
		const userData = userDoc.data() as UserData;

		// Verifikasi password
		const isPasswordCorrect = await verifyPassword(userData, password);

		if (!isPasswordCorrect) {
			// Jika password tidak valid
			return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
		}

		// Jika login berhasil, kirimkan response sukses dengan user ID
		return NextResponse.json({ message: 'Login successful', userId: userDoc.id });
	} catch (error) {
		console.error('Error during login:', error);
		return NextResponse.json({ message: 'An unexpected error occurred. Please try again.' }, { status: 500 });
	}
}
