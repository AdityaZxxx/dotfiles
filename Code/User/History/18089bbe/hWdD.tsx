import Link from 'next/link';
import ThemeSwitch from '../ui/theme-switch';

const Header = () => {
	return (
		<div className="flex items-center justify-between px-2 py-0 border-b-2">
			<Link href="/" className="text-2xl font-bold">
				Adxx
			</Link>
			<ThemeSwitch />
		</div>
	);
};

export default Header;
