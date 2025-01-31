import { JSX } from 'react';

const links = [
	{ href: '/dashboard', 
		name: 'Dashboard' },
		{
			href: 'dashboard/orders',
			name: 'Orders',
		},
		

export function DashboardNav(): JSX.Element {
	return (
		<nav>
			<h1>DashboardNav</h1>
		</nav>
	);
}
