import {} from 'firebase/firestore';
import app from './init';

const firestore = getFirestore(app);

export async function retreiveData() {
	const data = await getDocs(collection(firestore, 'products'));
	return data;
}
