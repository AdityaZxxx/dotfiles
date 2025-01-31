import { NextResponse } from 'next/server';
import { login } from '@/libs/firebase/service'; // Gantilah dengan fungsi login yang sesuai dari service Firebase

export async function POST(req: Request) {
	try {
		// Parsing request body
		const body = await req.json();
		const { email, password } = body;

		// Validasi input
		if (!email || !password) {
			return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
		}

		// Mencoba proses login
		const result = await login(email, password);

		if (result.success) {
			return NextResponse.json({ message: 'Login successful' }, { status: 200 });
		} else {
			return NextResponse.json({ message: result.message || 'Invalid email or password' }, { status: 401 });
		}
	} catch (error) {
		console.error('Error during login:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
