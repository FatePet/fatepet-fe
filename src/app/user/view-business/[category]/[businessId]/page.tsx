'use client';
import HeaderWithBackArrow from '@/components/headers/HeaderWithBackArrow';
import Tag from '@/components/tag/Tag';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import BusinessCard from './_components/BusinessCard';
import TextWithUnderLine from './_components/TextWithUnderLine';

const getBusinessDetailData: IGetBusinessDetailResponseType = {
	status: 200,
	message: 'success',
	data: {
		category: '장묘',
		name: '포 포우즈 춘천점',
		address: '강원도 춘천시 퇴계로 1233123123',
		businessHours: '24시간 연중무휴',
		phoneNumber: '010-1231-1231',
		thumbnailUrl: '/images/mockupImage1.png',
		email: 'example@example.com',
		services: [
			{
				type: '기본항목',
				name: '베이직 장례',
				description:
					'세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항',
				imageUrl: '/images/mockupImage3.png',
				price: '15KG미만: 35,000원, 15KG이상: 5123112원 ',
			},
			{
				type: '선택항목',
				name: '베이직 장례',
				description:
					'세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항세부사항',
				imageUrl: '/images/mockupImage3.png',
				price: '15KG미만: 35,000원, 15KG이상: 5123112원 ',
			},
			{
				type: '패키지',
				name: '베이직 장례',
				description: '',
				imageUrl: '',
				price: '15KG 미만: 35,000원, 15KG이상: 5123112원, 20KG 이상: 1212312원',
			},
		],
		additionalInfo: {
			imageUrl: '/images/mockupImage2.png',
			description:
				'기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 기타정보 ',
		},
	},
};

function UserViewBusiness() {
	const router = useRouter();
	const params = useParams();
	const rawCategory = params.category as string;
	const category = decodeURIComponent(rawCategory);
	const businessId = params.businessId as string;

	const handleBackArrowClick = () => {
		router.back();
	};

	return (
		<>
			<HeaderWithBackArrow
				headerTitle={category}
				handleBackArrowClick={handleBackArrowClick}
				hasRightConfirmButton={false}
			/>
			<div className='flex flex-col gap-[52px]'>
				<BusinessCard
					businessItem={{
						name: getBusinessDetailData.data.name,
						thumbnailUrl: getBusinessDetailData.data.thumbnailUrl,
						businessHours: getBusinessDetailData.data.businessHours,
						phoneNumber: getBusinessDetailData.data.phoneNumber,
						category: getBusinessDetailData.data.category,
						address: getBusinessDetailData.data.address,
					}}
				/>
				{getBusinessDetailData.data.services.some(
					(service) => service.type === '기본항목',
				) && (
					<div className='flex flex-col gap-[10px]'>
						<TextWithUnderLine itemType='기본항목' />
					</div>
				)}

				{getBusinessDetailData.data.services.some(
					(service) => service.type === '선택항목',
				) && (
					<div className='flex flex-col gap-[10px]'>
						<TextWithUnderLine itemType='선택항목' />
					</div>
				)}
				{getBusinessDetailData.data.services.some(
					(service) => service.type === '패키지',
				) && (
					<div className='flex flex-col gap-[10px]'>
						<TextWithUnderLine itemType='패키지' />
					</div>
				)}
			</div>
		</>
	);
}

export default UserViewBusiness;
