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
