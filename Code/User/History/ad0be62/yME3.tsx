'use client';
import { stat } from 'fs';
import { useSession } from 'next-auth/react';
import { Router } from 'next/router';
import { useEffect } from 'react';

export default function Admin() {
	const { status } = useSession();
	console.log(status);

    useEffect(() => {
        if (status === 'unauthenticated') {
            if(status === 'unauthenticated') {
        }
    })
	return (
		<div>
			<h1>Hello from admin</h1>
		</div>
	);
}
