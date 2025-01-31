import { useTheme } from 'next-themes';

export default function Home() {
	const { theme } = useTheme();
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
}
