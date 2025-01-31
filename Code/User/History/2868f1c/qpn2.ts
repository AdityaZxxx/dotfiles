import { addDoc, collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcrypt';

// Inisialisasi Firestore
const firestore = getFirestore();

/**
 * Fungsi untuk registrasi pengguna baru
 * @param data Data pengguna (fullname, email, password, role)
 * @returns {Promise<{status: boolean, message: string}>}
 */
export async function register(data: { fullname: string; email: string; password: string; role?: string }) {
	try {
		// Query untuk memeriksa apakah email sudah terdaftar
		const q = query(collection(firestore, 'users'), where('email', '==', data.email));
		const snapshot = await getDocs(q);

		// Cek apakah email sudah ada
		if (!snapshot.empty) {
			return { status: false, message: 'Email sudah terdaftar' };
		}

		// Menambahkan role default (jika tidak ada)
		data.role = data.role || 'member';

		// Hash password menggunakan bcrypt
		data.password = await bcrypt.hash(data.password, 10);

		// Tambahkan data pengguna baru ke koleksi "users"
		await addDoc(collection(firestore, 'users'), data);

		return { status: true, message: 'Pendaftaran berhasil' };
	} catch (error: unknown) {
		// Tangkap dan kembalikan pesan error
		const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat pendaftaran';
		return { status: false, message: errorMessage };
	}
}
