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
				size="default"
				onClick={() => {
					setTheme(themeIcon === 'light' ? 'dark' : 'light');
					setThemeIcon(themeIcon === 'light' ? 'dark' : 'light');
				}}
			>
				{themeIcon === 'light' ? <Moon size={36} /> : <Sun size={36} />}
			</Button>
		</>
	);
}
