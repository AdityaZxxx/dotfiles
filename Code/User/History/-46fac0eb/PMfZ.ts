import { getDocs, getFirestore } from 'firebase/firestore';
import app from './init';

const firestore = getFirestore(app);

export async function retreiveData(collection: string) {
	const data = await getDocs(collection(firestore, collectionName));
	const data = snapshotEqual.docs.map((doc) => doc.data());
}
