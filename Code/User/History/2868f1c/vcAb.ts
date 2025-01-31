import { collection, query, where, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	// your firebase config
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export async function register(
	data: {
		fullname: string;
		email: string;
		password: string;
	},
	callback: Function,
) {
	const q = query(collection(firestore, 'users'), where('email', '==', data.email));
}
