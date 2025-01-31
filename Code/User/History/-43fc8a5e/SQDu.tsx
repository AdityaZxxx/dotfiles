'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function Home() {
	const { setTheme } = useTheme();
	return (
		<div>
			<h1>Home</h1>
			<Button>
				<Moon onClick={() => setTheme('dark')} />
				<Sun onClick={() => setTheme('light')} />
			</Button>
		</div>
	);
}
