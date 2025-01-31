import { signUp } from '@/libs/firebase/service';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		// Parse body dari request
		const body = await req.json();

		// Panggil fungsi signUp
		await signUp(body, (status: boolean) => {
			if (status) {
				// Jika berhasil, kirim respons sukses
				return NextResponse.json({ status: true, statusCode: 200, message: 'success' }, { status: 200 });
			} else {
				// Jika gagal, kirim respons gagal
				return NextResponse.json({ status: false, statusCode: 400, message: 'failed' }, { status: 400 });
			}
		});
	} catch {
		// Tangani error
		return NextResponse.json({ status: false, statusCode: 500, message: 'internal server error' }, { status: 500 });
	}
}

export function OPTIONS() {
	// Untuk mendukung preflight requests (CORS)
	return NextResponse.json(null, { status: 204 });
}
