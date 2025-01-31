import { useSession } from 'next-auth/react';
import { Button } from '../ui/button';

const Navbar = () => {
	const { data } = useSession();
	return (
		<>
			<div>
				<Button onClick={}>Sign In</Button>
			</div>
		</>
	);
};

export default Navbar;
