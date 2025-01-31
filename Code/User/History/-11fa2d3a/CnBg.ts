import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/lib/firebase/service';

export async function POST(request: NextRequest) {
	try {
		// Ambil data JSON dari request
		const req = await request.json();
		console.log('Request body:', req);

		// Panggil fungsi register untuk memproses data
		const { status, message } = await register(req);

		// Kembalikan respons berdasarkan hasil register
		if (status) {
			return NextResponse.json({ status, message }, { status: 200 }); // Pendaftaran berhasil
		} else {
			return NextResponse.json({ status, message }, { status: 400 }); // Email sudah terdaftar atau error lain
		}
	} catch (error: unknown) {
		// Tangkap error dan kembalikan respons error
		if (error instanceof Error) {
			console.error('Error in registration:', error.message);
		} else {
			console.error('Error in registration:', error);
		}
		return NextResponse.json({ status: false, message: (error as Error).message || 'Terjadi kesalahan saat pendaftaran' }, { status: 500 });
	}
}
