import { collection, getFirestore, query, where } from 'firebase/firestore';
import { stat } from 'fs';

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
}
