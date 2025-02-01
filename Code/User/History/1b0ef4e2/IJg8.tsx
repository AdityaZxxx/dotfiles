'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
	const { setTheme } = useTheme();
	const [themeIcon, setThemeIcon] = React.useState('');

	return (
		<>
			<Button
				variant="ghost"
				size="lg"
				onClick={() => {
					setTheme(themeIcon === 'light' ? 'dark' : 'light');
					setThemeIcon(themeIcon === 'light' ? 'dark' : 'light');
				}}
			>
				{themeIcon === 'light' ? <Moon size={32} /> : <Sun size={32} />}
			</Button>
		</>
	);
}
