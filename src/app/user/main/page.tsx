'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import LocationBar from '@/components/location/LocationBar';
import RegisterLocationModal from '@/components/modals/RegisterLocationModal';
import ModalLayout from '@/components/modals/ModalLayout';
import UserCategory from './_components/UserCategory';

function UserMain() {
	// 전역 location 값
	const location = '';

	const [isRegisterLocationModalOpen, setIsRegisterLocationModalOpen] = useState<boolean>(false);
	const handleRegisterLocationModalBtnClick = () => {
		setIsRegisterLocationModalOpen(true);
	};

	return (
		<div>
			<div className='mt-3'>
				<Image
					src='/logo/fatepetLogo.svg'
					alt='fatepet Logo'
					width={120}
					height={120}
				/>
			</div>

			<div className='min-w-[320px] max-[600px] -mx-[16.2px] my-3 mb-7'>
				<LocationBar
					location={location}
					handleClick={handleRegisterLocationModalBtnClick}
				/>
			</div>

			<div className='grid grid-cols-2 gap-4 text-white aspect-square p-3'>
				<UserCategory
					upperText='내 주변 장묘업체'
					lowerText='찾아보기'
					iconUrl='none'
					category='장묘'
				/>
				<UserCategory
					upperText='추억할 수 있는'
					lowerText='악세사리 만들기'
					iconUrl='none'
					category='악세사리'
				/>
				<UserCategory
					upperText='새로운 만남을 위해'
					lowerText='브리더와 상담하기'
					iconUrl='none'
					category='브리더'
				/>
				<UserCategory
					upperText='펫로스 증후군'
					lowerText='전문 상담하기'
					iconUrl='none'
					category='행동상담'
				/>
			</div>

			{isRegisterLocationModalOpen && (
				<ModalLayout setIsModalOpen={setIsRegisterLocationModalOpen}>
					<RegisterLocationModal
						setIsModalOpen={setIsRegisterLocationModalOpen}
						location={location}
					/>
				</ModalLayout>
			)}
		</div>

	)
}

export default UserMain;
