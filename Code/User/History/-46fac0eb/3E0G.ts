import { collection, doc, getDocs, getFirestore, query } from 'firebase/firestore';
import app from './init';
import { getDoc } from 'firebase/firestore/lite';

const firestore = getFirestore(app);

export async function retreiveData(collectionName: string) {
	const snapshot = await getDocs(collection(firestore, collectionName));
	const data = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	return data;
}

export async function retreiveDataById(collectionName: string, id: string) {
	const snapshot = await getDoc(doc(firestore, collectionName, id));
	const data = snapshot.data();
	return data;
}

export async function signUp(userData: any, callback: Function) {
	const q = query(collection(firestore, 'users'), where('email', '==', userData.email));
	const snapshot = await getDocs(q);
	const data = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
}
