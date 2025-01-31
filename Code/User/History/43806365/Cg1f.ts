import { signUp } from '@/libs/firebase/service';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			// Panggil fungsi signUp dengan data dari body request
			await signUp(req.body, (status: boolean) => {
				if (status) {
					// Jika berhasil, kirim respons sukses
					res.status(200).json({ status: true, statusCode: 200, message: 'success' });
				} else {
					// Jika gagal, kirim respons gagal
					res.status(400).json({ status: false, statusCode: 400, message: 'failed' });
				}
			});
		} catch {
			// Tangani error yang terjadi selama proses signUp
			res.status(500).json({ status: false, statusCode: 500, message: 'internal server error' });
		}
	} else {
		// Jika method bukan POST, kirim respons method not allowed
		res.status(405).json({ status: false, statusCode: 405, message: 'method not allowed' });
	}
}
