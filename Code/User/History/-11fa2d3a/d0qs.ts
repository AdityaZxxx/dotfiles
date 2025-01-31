// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/lib/firebase/service';

export async function POST(request: NextRequest) {
	try {
		const req = await request.json();
		console.log('Request body:', req);

		// Panggil fungsi register
		const { status, message } = await register(req);

		// Kembalikan respons berdasarkan hasil registrasi
		if (status) {
			return NextResponse.json({ status, message }, { status: 200 });
		} else {
			return NextResponse.json({ status, message }, { status: 400 });
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Error in registration API:', error.message);
			return NextResponse.json({ status: false, message: error.message || 'Terjadi kesalahan saat pendaftaran' }, { status: 500 });
		} else {
			console.error('Error in registration API:', error);
			return NextResponse.json({ status: false, message: 'Terjadi kesalahan saat pendaftaran' }, { status: 500 });
		}
	}
}
