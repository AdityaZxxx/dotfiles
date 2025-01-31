import { JSX } from 'react';

const links = [
	{ href: '/dashboard', 
		name: 'Dashboard' },
		{
			href: 'dashboard/orders',
			name: 'Orders',
		},
		{
			href: 'dashboard/products',
			name: 'Products',
		},
		{
			href: 'dashboard/categories',
			name: 'Categories',
		},

export function DashboardNav(): JSX.Element {
	return (
		<nav>
			<h1>DashboardNav</h1>
		</nav>
	);
}
