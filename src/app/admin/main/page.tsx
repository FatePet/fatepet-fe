'use client';
import HeaderWithRightbutton from '@/components/headers/HeaderWithRightbutton';
import React, { useState } from 'react';
import AdminBusinessCard from './_components/AdminBusinessCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function AdminMain() {
	const handleLogout = () => {
		// 로그아웃 로직

		route.push('/admin/login')
	}

	// 테스트용 업체 정보
	const testBusiness = [
		{
			businessName: '포 포우즈 춘천점',
			businessAddress: "강원도 춘천시 퇴계로 1223121312",
			businessImage: "/images/mockupImage1.png",
			storeId: 1
		},
		{
			businessName: '포 포우즈 춘천점',
			businessAddress: "강원도 춘천시 퇴계로 1223121312",
			businessImage: "/images/mockupImage1.png",
			storeId: 2
		}
	]

	const route = useRouter()
	const handleCardClick = (index: number) => {
		route.push(`/admin/view-business/${testBusiness[index].storeId}`)
	}

	return (
		<div>
			<div>
				<HeaderWithRightbutton
					type='admin'
					headerTitle='내 업체'
					handleButtonClick={handleLogout}
				/>
			</div>
			<div>
				{testBusiness.length === 0 ? (
					<div className='flex flex-col justify-center items-center h-[70vh] font-bold text-gray-500'>
						<div>등록된 업체가 없어요.</div>
						<div>업체를 추가해 주세요</div>
					</div>
				) : (
					<div>
						{testBusiness.map((item, index) => (
							<AdminBusinessCard
								key={index}
								businessName={item.businessName}
								businessAddress={item.businessAddress}
								businessImage={item.businessImage}
								index={index}
								handleClick={handleCardClick}
							/>
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
					onClick={() => {
						route.push('/admin/register-business')
					}}
				/>
			</div>
		</div>

	)
}

export default AdminMain;
