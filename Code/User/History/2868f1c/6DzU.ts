import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcrypt';

// Inisialisasi Firestore
import { firestore } from './init';

export async function register(data: { fullname: string; email: string; password: string; role?: string }): Promise<{ status: boolean; message: string }> {
	try {
		console.log('Registering user with data:', data); // Log input data

		// Query untuk memeriksa apakah email sudah ada
		const q = query(collection(firestore, 'users'), where('email', '==', data.email));
		const snapshot = await getDocs(q);

		// Log hasil query
		console.log(
			'Query snapshot:',
			snapshot.docs.map((doc) => doc.data()),
		);

		// Jika email sudah terdaftar
		if (snapshot.docs.length > 0) {
			console.warn('Email already exists:', data.email); // Log warning jika email sudah ada
			return { status: false, message: 'Email sudah terdaftar' };
		}

		// Hash password dan tambahkan data ke Firestore
		data.role = 'member';
		data.password = await bcrypt.hash(data.password, 10);
		await addDoc(collection(firestore, 'users'), data);

		console.log('User registered successfully:', data.email);
		return { status: true, message: 'Pendaftaran berhasil' };
	} catch (error: unknown) {
		// Tangkap dan kembalikan pesan error
		const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat pendaftaran';
		return { status: false, message: errorMessage };
	}
}
