'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import LocationBar from '@/components/location/LocationBar';
import RegisterLocationModal from '@/components/modals/RegisterLocationModal';
import ModalLayout from '@/components/modals/ModalLayout';

function UserMain() {
	// 전역 location 값
	const location = '';

	const [isRegisterLocationModalOpen, setIsRegisterLocationModalOpen] = useState<boolean>(false);
	const handleRegisterLocationModal = () => {
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

			<div className='min-w-[320px] max-[600px] -mx-[16.2px] my-3'>
				<LocationBar
					location={location}
					handleClick={handleRegisterLocationModal}
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
