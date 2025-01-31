import { NextResponse } from 'next/server';
import { login } from '@/libs/firebase/service'; // Gantilah dengan fungsi login yang sesuai dari service Firebase

export async function POST(req: Request) {
	try {
		const body = await req.json();
		console.log('Received data:', body); // Cek data yang diterima
		const { email, password } = body;

		if (!email || !password) {
			return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
		}

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
