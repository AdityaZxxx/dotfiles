'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from './button';
import { useTheme } from 'next-themes';

const themeSwitch = () => {
	const { setTheme } = useTheme();
	return (
		<div>
			<Button onClick={() => setTheme('dark')}>
				<Moon size={20} />
			</Button>
			<Button onClick={() => setTheme('light')}>
				<Sun size={20} />
			</Button>
		</div>
	);
};
