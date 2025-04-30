'use client';

import { usePathname } from 'next/navigation';
import AdminLogin from './admin/login/page';
import UserMain from './user/main/page';

export default function Main() {
	const pathname = usePathname();
	if (pathname.startsWith('/admin')) {
		return <AdminLogin />;
	}
	if (pathname.startsWith('/user')) {
		return <UserMain />;
	}

	return (
		<div className='w-full h-full flex justify-center items-center'>
			404 | Not Found
		</div>
	);
}
