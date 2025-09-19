'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
	{ href: '/', label: 'หน้าหลัก' },
	{ href: '/campaign', label: 'แคมเปญ' },
	{ href: '/rewards', label: 'แลกของ' },
	{ href: '/wallet', label: 'วอเล็ท' },
];

export default function BottomNav() {
	const pathname = usePathname();
	return (
		<nav className="fixed bottom-0 left-0 right-0 border-t bg-white grid grid-cols-4 text-sm">
			{items.map((it) => {
				const active = pathname === it.href;
				return (
					<Link key={it.href} href={it.href} className={`p-3 text-center ${active ? 'font-semibold' : 'text-gray-500'}`}>
						{it.label}
					</Link>
				);
			})}
		</nav>
	);
}


