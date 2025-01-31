import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Moon } from 'lucide-react';

export default function Home() {
	const { theme } = useTheme();
	return (
		<div>
			<h1>Home</h1>
			<Button>
				<Moon onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
			</Button>
		</div>
	);
}
