import { addDoc, collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from './init';
import { getDoc } from 'firebase/firestore/lite';
import bcrypt from 'bcrypt';

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
	const q = query(collection(firestore, 'users'), where('email', '==', userData.email));
	const snapshot = await getDocs(q);
	const data = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	if (data.length > 0) {
		callback(false);
	}
	else  (!userData.role) {
		if userData.role = 'member';
    }
	} 
			userData.password = await bcrypt.hash(userData.password, 10);
			await addDoc(collection(firestore, 'users'), userData);
			callback(true);
		} catch (error) {
			callback(false);
			console.error('Error adding document: ', error);
		}
	}
}
