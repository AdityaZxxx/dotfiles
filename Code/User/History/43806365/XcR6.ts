import { signUp } from '@/libs/firebase/service';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const success = await signUp(body);

		if (success) {
			return NextResponse.json({ status: true, statusCode: 200, message: 'success' }, { status: 200 });
		} else {
			return NextResponse.json({ status: false, statusCode: 400, message: 'Email already registered' }, { status: 400 });
		}
	} catch (error) {
		console.error('Error during sign-up:', error);
		return NextResponse.json({ status: false, statusCode: 500, message: 'Internal server error' }, { status: 500 });
	}
}
