import Link from 'next/link';
import { JSX } from 'react';

const links = [
	{ href: '/dashboard', name: 'Dashboard' },
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
];

export function DashboardNav(): JSX.Element {
	return (
		<>
			{links.map((link) => (
				<Link key={link.href} href={link.href}>
					{link.name}
				</Link>
			))}
		</>
	);
}
