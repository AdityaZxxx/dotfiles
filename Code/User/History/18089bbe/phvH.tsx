import ThemeSwitch from '../ui/theme-switch';

const Header = () => {
	return (
		<div className="flex items-center justify-between">
			<h1>Adxx</h1>
			<ThemeSwitch />
		</div>
	);
};

export default Header;
