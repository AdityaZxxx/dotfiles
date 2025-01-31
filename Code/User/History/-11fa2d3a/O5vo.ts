import { NextApiRequest, NextApiResponse } from 'next';
import { register } from '@/lib/firebase/service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { fullname, email, password } = JSON.parse(req.body);

			// Validasi input
			if (!fullname || !email || !password) {
				return res.status(400).json({ status: false, message: 'Semua kolom wajib diisi.' });
			}

			// Panggil fungsi register dari service Firestore
			const result = await register({ fullname, email, password });

			// Tanggapi sesuai hasil
			if (result.status) {
				res.status(200).json(result);
			} else {
				res.status(400).json(result);
			}
		} catch (error) {
			console.error('Error in /api/auth/register:', error);
			res.status(500).json({ status: false, message: 'Terjadi kesalahan pada server.' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ status: false, message: `Method ${req.method} tidak diizinkan.` });
	}
}
