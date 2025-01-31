'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from './button';
import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
	const { setTheme } = useTheme();
	return (
		<div>
			<Button variant="ghost" onClick={() => setTheme('dark')}>
				<Moon size={20} />
			</Button>
			<Button variant="ghost" onClick={() => setTheme('light')}>
				<Sun size={20} />
			</Button>
		</div>
	);
};

export default ThemeSwitch;
