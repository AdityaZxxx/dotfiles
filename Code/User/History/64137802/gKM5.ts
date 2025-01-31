import { NextResponse } from 'next/server';
import { signUp } from '@/libs/firebase/service';

export async function POST(req: Request) {
	try {
		// Parsing request body
		const body = await req.json();
		const { email, password, name, phone, address, role } = body;

		// Validasi input
		if (!email || !password || !name) {
			return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
		}

		// Cek validitas opsional field (jika disediakan)
		if (phone && typeof phone !== 'string') {
			return NextResponse.json({ message: 'Invalid phone format' }, { status: 400 });
		}

		if (address && typeof address !== 'string') {
			return NextResponse.json({ message: 'Invalid address format' }, { status: 400 });
		}

		// Mencoba proses sign-up
		const result = await signUp({
			email,
			password,
			name,
			phone,
			address,
			role,
		});

		if (result) {
			return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
		} else {
			return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
		}
	} catch (error) {
		console.error('Error during sign-up:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
