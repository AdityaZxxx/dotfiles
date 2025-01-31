// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBho_uyO2cj3QRdoTI5Dqx4xvJQEwAUyuE',
	authDomain: 'adxx-343ca.firebaseapp.com',
	projectId: 'adxx-343ca',
	storageBucket: 'adxx-343ca.firebasestorage.app',
	messagingSenderId: '125659784980',
	appId: '1:125659784980:web:4698b2f666ba6b3f4d8401',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
