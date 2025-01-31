import { signUp } from '@/libs/firebase/service'; // Pastikan path sesuai
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: `Method ${req.method} not allowed` });
	}

	const { email, password, name, phone, address, role } = req.body;

	// Validasi input
	if (!email || !password || !name) {
		return res.status(400).json({ message: 'Missing required fields' });
	}

	try {
		const result = await signUp({ email, password, name, phone, address, role });

		if (result) {
			return res.status(201).json({ message: 'User registered successfully' });
		} else {
			return res.status(400).json({ message: 'Email already exists' });
		}
	} catch (error) {
		console.error('Error during sign-up:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}
