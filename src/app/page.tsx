'use client';

import { usePathname } from 'next/navigation';
import AdminLogin from './admin/login/page';
import UserMain from './user/main/page';
import LongInput from '@/components/inputs/LongInput';
import { useState } from 'react';

export default function Main() {
	// 공통 컴포넌트
	const [inputData, setInputData] = useState<string>('');
	const placeHolder = 'Place Holder';
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const trimmedKeyword = e.target.value.trim();
		setInputData(trimmedKeyword);
	};
	// 끝
	const pathname = usePathname();
	if (pathname.startsWith('/admin')) {
		return <AdminLogin />;
	}
	if (pathname.startsWith('/user')) {
		return <UserMain />;
	}

	return (
		<div className='w-full h-full flex flex-col justify-center items-center gap-[20px]'>
			<div>활성화</div>
			<LongInput
				inputData={inputData}
				onChange={handleInputChange}
				placeHolder={placeHolder}
				disabled={false}
			/>
			<div>비활성화</div>
			<LongInput
				inputData={inputData}
				onChange={handleInputChange}
				placeHolder={placeHolder}
				disabled={true}
			/>
		</div>
	);
}
