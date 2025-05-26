'use client';
import HeaderWithRightbutton from '@/components/headers/HeaderWithRightbutton';
import React from 'react';
import AdminBusinessCard from './_components/AdminBusinessCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { useGetAdminBusiness } from '@/hooks/api/admin/business/useGetAdminBusiness';

function AdminMain() {
	const route = useRouter();
	const { clearAuth } = useAuthStore();
	const { accessToken, setAccessToken} = useAuthStore();

	const handleLogout = async () => {
		// 로그아웃 로직(임시 프론트에서 처리)
		clearAuth();
		route.replace('/admin/login');
	};

	const handleRegisterClick = () => {
		route.push('/admin/register-business');
	};

	const { data: adminBusiness } = useGetAdminBusiness(
		accessToken, setAccessToken
	);

	if (!adminBusiness) {
		return null;
	};

	return (
		<div>
			<div>
				<HeaderWithRightbutton
					headerTitle='내 업체'
					buttonTitle='로그아웃'
					handleButtonClick={handleLogout}
				/>
			</div>
			<div>
				{adminBusiness.data.length === 0 ? (
					<div className='flex flex-col justify-center items-center h-[70vh] font-bold text-gray-500'>
						<div>등록된 업체가 없어요.</div>
						<div>업체를 추가해 주세요</div>
					</div>
				) : (
					<div>
						{adminBusiness.data.map((businessItem, index) => (
							<AdminBusinessCard key={index} adminBusinessItem={businessItem} />
						))}
					</div>
				)}
			</div>
			<div className='absolute bottom-16 right-16'>
				<Image
					src='/icons/registerIcon.svg'
					width={80}
					height={80}
					alt='등록 버튼'
					className='cursor-pointer'
					onClick={handleRegisterClick}
				/>
			</div>
		</div>
	);
}

export default AdminMain;
