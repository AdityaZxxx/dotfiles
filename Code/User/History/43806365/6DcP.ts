import type { NextApiRequest, NextApiResponse } from 'next';
import { signUp } from 'libs/firebase/service';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json({ status: true });
}
