'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';

export const Navbar = () => {
	// State visibility dari navbar
	const [nav, setNav] = useState(false);

	// Toggle function to handle navbar display
	const handleNav = () => {
		setNav(!nav);
	};

	// Array items navbar
	const navItems = [
		{ id: 1, text: 'Home' },
		{ id: 2, text: 'Company' },
		{ id: 3, text: 'Resources' },
		{ id: 4, text: 'About' },
		{ id: 5, text: 'Contact' },
	];

	return (
		<nav className="sticky top-0 bg-secondary rounded-xl flex justify-between items-center sm:h-24 h-14 max-w-[1240px] mx-auto px-4 text-primary font-semibold">
			{/* Logo */}
			<h1 className="w-full text-3xl font-bold text-primary">School</h1>

			{/* Desktop Navigation */}
			<ul className="hidden md:flex">
				{navItems.map((item) => (
					<li key={item.id} className="p-4 hover:bg-primary rounded-xl m-2 cursor-pointer duration-300 hover:text-secondary">
						{item.text}
					</li>
				))}
			</ul>

			{/* Mobile Navigation Icon */}
			<div onClick={handleNav} className="block md:hidden">
				{nav ? <Menu size={32} /> : <Menu size={32} />}
			</div>

			{/* Mobile Navigation Menu */}
			<ul className={nav ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-secondary ease-in-out duration-500' : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'}>
				{/* Mobile Logo */}
				<h1 className="w-full text-3xl font-bold text-primary m-4">School</h1>

				{/* Mobile Navigation Items */}
				{navItems.map((item) => (
					<li key={item.id} className="p-4 border-b rounded-xl hover:bg-secondary duration-300 hover:text-primary cursor-pointer border-gray-400">
						{item.text}
					</li>
				))}
			</ul>
		</nav>
	);
};
