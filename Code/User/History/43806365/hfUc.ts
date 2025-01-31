import type { NextApiRequest, NextApiResponse } from 'next';
import { signUp } from 'libs/firebase/service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        await signUp({
            req.body,
            (status: boolean) => {
                if (status) {
                    res.status(200).json({ status: true, message: 'success' });
                } else {
                    res.status(400).json({ status: false, message: 'email already exists' });
                },
            },
        }),
    }


	res.status(200).json({ status: true, message: 'success' });
}
