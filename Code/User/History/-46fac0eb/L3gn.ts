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
 * @param callback - Fungsi callback yang akan dipanggil setelah proses selesai.
 */
export async function signUp(
	userData: {
		email: string;
		password: string;
		name: string;
		phone: string;
		address: string;
		role?: string;
	},
	callback: (success: boolean) => void,
) {
	try {
		// Cek apakah email sudah terdaftar
		const q = query(collection(firestore, 'users'), where('email', '==', userData.email));
		const snapshot = await getDocs(q);
		const data = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		if (data.length > 0) {
			// Jika email sudah terdaftar, panggil callback dengan false
			callback(false);
		} else {
			// Jika role tidak disediakan, set default role menjadi 'member'
			if (!userData.role) {
				userData.role = 'member';
			}

			// Hash password sebelum disimpan
			userData.password = await bcrypt.hash(userData.password, 10);

			// Tambahkan data pengguna ke Firestore
			await addDoc(collection(firestore, 'users'), userData);

			// Panggil callback dengan true jika berhasil
			callback(true);
		}
	} catch (error) {
		// Tangani error dan panggil callback dengan false
		callback(false);
		console.error('Error adding document: ', error);
	}
}
