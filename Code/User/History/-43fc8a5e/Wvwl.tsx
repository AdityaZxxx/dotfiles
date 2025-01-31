'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function Home() {
	const { setTheme } = useTheme();
	return (
		<main>
			<h1>Hello</h1>
			<Button onClick={() => setTheme('dark')}>
				<Moon size={20} />
			</Button>
			<Button onClick={() => setTheme('light')}>
				<Sun size={20} />
			</Button>
		</main>
	);
}
