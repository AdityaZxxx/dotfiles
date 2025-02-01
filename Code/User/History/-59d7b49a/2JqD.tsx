import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Image from 'next/image';

export const Footer = () => {
	return (
		<footer className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 py-10 px-10 font-sans tracking-wide">
			<div className="max-w-[1240px] mx-auto text-center">
				<a href="javascript:void(0)" className="inline-block">
					<Image width={500} height={500} src="https://readymadeui.com/readymadeui-light.svg" alt="logo" className="w-44" />
				</a>
				<p className="text-sm mt-8 text-gray-300">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida, mi eu pulvinar cursus, sem elit interdum mauris dipiscing elit. Aenean gravida, mi eu pulvinar cursus.{' '}
					<a href="javascript:void(0)" className="text-sm font-semibold text-blue-500">
						Read more...
					</a>
				</p>

				<ul className="flex flex-wrap justify-center gap-6 mt-8">
					<li>
						<a href="javascript:void(0)">
							<Facebook className="w-8 h-8 text-white bg-blue-600 rounded-full flex items-center justify-center" />
						</a>
					</li>
					<li>
						<a href="javascript:void(0)">
							<Linkedin className="w-8 h-8 text-white bg-blue-600 rounded-full flex items-center justify-center" />
						</a>
					</li>
					<li>
						<a href="javascript:void(0)">
							<Instagram className="w-8 h-8 text-white bg-blue-600 rounded-full flex items-center justify-center" />
						</a>
					</li>
					<li>
						<a href="javascript:void(0)">
							<Youtube className="w-8 h-8 text-white bg-blue-600 rounded-full flex items-center justify-center" />
						</a>
					</li>
				</ul>
			</div>

			<ul className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-12 mt-20">
				<li className="flex items-center">
					<div className="bg-gray-900 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
						<
					</div>
					<a href="javascript:void(0)" className="text-gray-300 text-sm ml-3">
						<small className="block">Tel</small>
						<strong>180-548-2588</strong>
					</a>
				</li>
				<li className="flex items-center">
					<div className="bg-gray-900 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#007bff" viewBox="0 0 479.058 479.058">
							<path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z" data-original="#000000" />
						</svg>
					</div>
					<a href="javascript:void(0)" className="text-gray-300 text-sm ml-3">
						<small className="block">Mail</small>
						<strong>info@example.com</strong>
					</a>
				</li>
				<li className="flex items-center">
					<div className="bg-gray-900 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#007bff" viewBox="0 0 368.16 368.16">
							<path d="M184.08 0c-74.992 0-136 61.008-136 136 0 24.688 11.072 51.24 11.536 52.36 3.576 8.488 10.632 21.672 15.72 29.4l93.248 141.288c3.816 5.792 9.464 9.112 15.496 9.112s11.68-3.32 15.496-9.104l93.256-141.296c5.096-7.728 12.144-20.912 15.72-29.4.464-1.112 11.528-27.664 11.528-52.36 0-74.992-61.008-136-136-136zM293.8 182.152c-3.192 7.608-9.76 19.872-14.328 26.8l-93.256 141.296c-1.84 2.792-2.424 2.792-4.264 0L88.696 208.952c-4.568-6.928-11.136-19.2-14.328-26.808-.136-.328-10.288-24.768-10.288-46.144 0-66.168 53.832-120 120-120s120 53.832 120 120c0 21.408-10.176 45.912-10.28 46.152z" data-original="#000000" />
							<path d="M184.08 64.008c-39.704 0-72 32.304-72 72s32.296 72 72 72 72-32.304 72-72-32.296-72-72-72zm0 128c-30.872 0-56-25.12-56-56s25.128-56 56-56 56 25.12 56 56-25.128 56-56 56z" data-original="#000000" />
						</svg>
					</div>
					<a href="javascript:void(0)" className="text-gray-300 text-sm ml-3">
						<small className="block">Address</small>
						<strong>123 Main Street City, Country</strong>
					</a>
				</li>
				<li className="flex items-center">
					<div className="bg-gray-900 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#007bff" viewBox="0 0 100 100">
							<path d="M83 23h-3V11c0-3.309-2.692-6-6-6H26c-3.308 0-6 2.691-6 6v12h-3C8.729 23 2 29.729 2 38v30c0 4.963 4.037 9 9 9h9v12c0 3.309 2.692 6 6 6h48c3.308 0 6-2.691 6-6V77h9c4.963 0 9-4.037 9-9V38c0-8.271-6.729-15-15-15zM26 11h48v12H26zm0 78V59h48v30zm66-21c0 1.654-1.345 3-3 3h-9V59h3a3 3 0 1 0 0-6H17a3 3 0 1 0 0 6h3v12h-9c-1.655 0-3-1.346-3-3V38c0-4.963 4.037-9 9-9h66c4.963 0 9 4.037 9 9zm-27 0a3 3 0 0 1-3 3H38a3 3 0 1 1 0-6h24a3 3 0 0 1 3 3zm0 12a3 3 0 0 1-3 3H38a3 3 0 1 1 0-6h24a3 3 0 0 1 3 3zm21-42a3 3 0 0 1-3 3h-6a3 3 0 1 1 0-6h6a3 3 0 0 1 3 3z" data-original="#000000" />
						</svg>
					</div>
					<a href="javascript:void(0)" className="text-gray-300 text-sm ml-3">
						<small className="block">Fax</small>
						<strong>+1-548-2588</strong>
					</a>
				</li>
			</ul>

			<hr className="my-10 border-gray-500" />

			<div className="flex max-md:flex-col gap-4">
				<ul className="flex flex-wrap gap-4">
					<li className="text-sm">
						<a href="javascript:void(0)" className="text-gray-300 font-semibold hover:underline">
							Terms of Service
						</a>
					</li>
					<li className="text-sm">
						<a href="javascript:void(0)" className="text-gray-300 font-semibold hover:underline">
							Privacy Policy
						</a>
					</li>
					<li className="text-sm">
						<a href="javascript:void(0)" className="text-gray-300 font-semibold hover:underline">
							Security
						</a>
					</li>
				</ul>
				<p className="text-sm text-gray-300 md:ml-auto">© ReadymadeUI. All rights reserved.</p>
			</div>
		</footer>
	);
};
