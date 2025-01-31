import { addDoc, collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from './init';
import { getDoc } from 'firebase/firestore/lite';
import bcrypt from 'bcrypt';

const firestore = getFirestore(app);

/**
 * Mengambil semua data dari koleksi Firestore.
 * @param collectionName - Nama koleksi Firestore.
 * @returns Array of objects yang berisi data dari koleksi.
 */
export async function retrieveData(collectionName: string) {
	const snapshot = await getDocs(collection(firestore, collectionName));
	const data = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	return data;
}

/**
 * Mengambil data dari Firestore berdasarkan ID dokumen.
 * @param collectionName - Nama koleksi Firestore.
 * @param id - ID dokumen yang ingin diambil.
 * @returns Object yang berisi data dokumen.
 */
export async function retrieveDataById(collectionName: string, id: string) {
	const snapshot = await getDoc(doc(firestore, collectionName, id));
	const data = snapshot.data();
	return data;
}

/**
 * Mendaftarkan pengguna baru ke Firestore.
 * @param userData - Data pengguna yang akan didaftarkan.
 */
export async function signUp(userData: { email: string; password: string; name: string; phone?: string; address?: string; role?: string }): Promise<boolean> {
	try {
		// Cek apakah email sudah terdaftar
		const q = query(collection(firestore, 'users'), where('email', '==', userData.email));
		const snapshot = await getDocs(q);

		if (!snapshot.empty) {
			// Jika email sudah terdaftar
			return false;
		}

		// Jika role tidak disediakan, set default role menjadi 'member'
		if (!userData.role) {
			userData.role = 'member';
		}

		// Hash password sebelum disimpan
		try {
			userData.password = await bcrypt.hash(userData.password, 10);
		} catch (error) {
			console.error('Error hashing password:', error);
			throw new Error('Password hashing failed');
		}

		// Tambahkan data pengguna ke Firestore
		await addDoc(collection(firestore, 'users'), userData);

		return true; // Pendaftaran berhasil
	} catch (error) {
		console.error('Error adding document: ', error);
		return false; // Terjadi error
	}
}

// Fungsi untuk login
export const loginWithEmailAndPassword = async (email: string, password: string) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return userCredential.user; // User informasi
	} catch (error) {
		throw new Error('Login failed: ' + error.message);
	}
};
