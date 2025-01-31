// app/api/auth/register/route.ts

import { NextRequest, NextResponse } from 'next/server'; // Ganti dengan NextRequest dan NextResponse untuk App Router
import { register } from '@/lib/firebase/service';

export async function POST(req: NextRequest) {
	try {
		const { fullname, email, password } = await req.json(); // Parsing request body menggunakan .json() untuk App Router

		// Validasi input
		if (!fullname || !email || !password) {
			return NextResponse.json({ status: false, message: 'Semua kolom wajib diisi.' }, { status: 400 });
		}

		// Panggil fungsi register dari service Firestore
		const result = await register({ fullname, email, password });

		// Tanggapi sesuai hasil
		if (result.status) {
			return NextResponse.json(result, { status: 200 });
		} else {
			return NextResponse.json(result, { status: 400 });
		}
	} catch (error) {
		console.error('Error in /api/auth/register:', error);
		return NextResponse.json({ status: false, message: 'Terjadi kesalahan pada server.' }, { status: 500 });
	}
}
