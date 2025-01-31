import { useSession } from 'next-auth/react';

const Navbar = () => {
	const { data } = useSession();
	return (
		<nav>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/about">About</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
