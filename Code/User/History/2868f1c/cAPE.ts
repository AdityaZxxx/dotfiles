import { collection, getFirestore, query, where } from 'firebase/firestore';

const firestore = getFirestore();
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
const snapshot = await getDocs(q);
const users = snapshot.docs.map((doc) =>
	doc.data({
		id: doc.id,
		...doc.data(),
	}),
);
