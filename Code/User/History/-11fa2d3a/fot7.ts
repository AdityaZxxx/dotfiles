import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/lib/firebase/service';

export async function POST(request: NextRequest) {
	const req = await request.json();
	console.log(req);

    await register(
        req,
        {{ status, message }: { status: boolean; message: string } = {
            if (status) {
                return NextResponse.json({ status, message }, { status: 200 });
            } else {
                return NextResponse.json({ status, message }, { status: 400 });
            }
        }
        

        }}
    );
	return NextResponse.json({ message: 'Pendaftaran berhasil' });
}
