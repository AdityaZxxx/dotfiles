import { addDoc, collection, getFirestore, query, where } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import bcrypt from 'bcrypt';

const firestore = getFirestore();
export async function register(
	data: {
		fullname: string;
		email: string;
		password: string;
		role?: string;
	},
	callback: Function,
) {
	const q = query(collection(firestore, 'users'), where('email', '==', data.email));
}
const snapshot = await getDocs(q);
const users = snapshot.docs.map((doc) =>
	doc.data({
		id: doc.id,
		...doc.data(),
	}),
);

if (users.length > 0) {
	callback({ status: false, message: 'Email sudah terdaftar' });
} else {
	data.role = 'member';
	data.password = await bcrypt.hash(data.password, 10);

	await addDoc(collection(firestore, 'users'), data)
		.then(() => {
			callback({ status: true, message: 'Pendaftaran berhasil' });
		})
		.catch((error) => {
			callback({ status: false, message: error.message });
		});
}
