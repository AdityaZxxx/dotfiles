import { register } from 'module';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const req = await request.json();
	console.log(req);

    await register(req, {{}})
	return NextResponse.json({ message: 'Pendaftaran berhasil' });
}
