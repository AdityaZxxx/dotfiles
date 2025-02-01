import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Printer, Youtube } from 'lucide-react';
import Image from 'next/image';

export const Footer = () => {
	return (
		<footer className="bg-primary py-10 px-10 font-sans tracking-wide">
			<div className="max-w-[1240px] mx-auto text-center">
				<a href="javascript:void(0)" className="inline-block">
					<Image width={500} height={500} src="https://readymadeui.com/readymadeui-light.svg" alt="logo" className="w-44 text-gray-100" />
				</a>
				<p className="text-md mt-8 text-gray-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida, mi eu pulvinar cursus, sem elit interdum mauris dipiscing elit. Aenean gravida, mi eu pulvinar cursus. </p>

				<ul className="flex flex-wrap justify-center gap-6 mt-8">
					<li>
						<a href="javascript:void(0)">
							<Facebook className="w-8 h-8 text-white  flex items-center justify-center" />
						</a>
					</li>

					<li>
						<a href="javascript:void(0)">
							<Linkedin className="w-8 h-8 text-white  flex items-center justify-center" />
						</a>
					</li>
					<li>
						<a href="javascript:void(0)">
							<Instagram className="w-8 h-8 text-white  flex items-center justify-center" />
						</a>
					</li>
					<li>
						<a href="javascript:void(0)">
							<Youtube className="w-8 h-8 text-white  flex items-center justify-center" />
						</a>
					</li>
				</ul>
			</div>

			<ul className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-12 mt-20">
				<li className="flex items-center">
					<div className="bg-gray-900 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
						<Phone className="w-6 h-6 text-white" />
					</div>
					<a href="javascript:void(0)" className="text-gray-600 text-sm ml-3">
						<small className="block">Tel</small>
						<strong>180-548-2588</strong>
					</a>
				</li>
				<li className="flex items-center">
					<div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
						<Mail className="w-6 h-6 text-white bg-none" />
					</div>
					<a href="javascript:void(0)" className="text-gray-100 text-sm ml-3">
						<small className="block">Mail</small>
						<strong>info@example.com</strong>
					</a>
				</li>
				<li className="flex items-center">
					<div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
						<MapPin className="w-6 h-6 text-white" />
					</div>
					<a href="javascript:void(0)" className="text-gray-100 text-sm ml-3">
						<small className="block">Address</small>
						<strong>123 Main Street City, Country</strong>
					</a>
				</li>
				<li className="flex items-center">
					<div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
						<Printer className="w-6 h-6 text-white" />
					</div>
					<a href="javascript:void(0)" className="text-gray-100 text-sm ml-3">
						<small className="block">Fax</small>
						<strong>+1-548-2588</strong>
					</a>
				</li>
			</ul>

			<hr className="my-10 border-gray-100" />

			<div className="flex max-md:flex-col gap-4">
				<ul className="flex flex-wrap gap-4">
					<li className="text-sm">
						<a href="javascript:void(0)" className="text-gray-100 font-semibold hover:underline">
							Terms of Service
						</a>
					</li>
					<li className="text-sm">
						<a href="javascript:void(0)" className="text-gray-100 font-semibold hover:underline">
							Privacy Policy
						</a>
					</li>
					<li className="text-sm">
						<a href="javascript:void(0)" className="text-gray-100 font-semibold hover:underline">
							Security
						</a>
					</li>
				</ul>
				<p className="text-sm text-gray-100 md:ml-auto">© ReadymadeUI. All rights reserved.</p>
			</div>
		</footer>
	);
};
