'use client';
import RoundedButton from '@/components/buttons/RoundedButton';
import HeaderWithBackArrow from '@/components/headers/HeaderWithBackArrow';
import LocationBar from '@/components/location/LocationBar';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import SortOptionModal from './_components/SortOptionModal';
import BusinessCard from '@/components/user/BusinessCard';
import ModalLayout from '@/components/modals/ModalLayout';
import RegisterLocationModal from '@/components/modals/RegisterLocationModal';
import useUserLocationStore from '@/store/useUserLocationStore';

import LoadingSpinner from '@/components/loading/LoadingSpinner';
import toast from 'react-hot-toast';
import { useGetUserBusiness } from '@/hooks/api/user/business/useGetUserBusiness';

function ViewBusinessList() {
	const router = useRouter();
	const params = useParams();
	const rawCategory = params.category as string;
	const category = decodeURIComponent(rawCategory);
	const [isSortOptionModalOpen, setIsSortOptionModalOpen] =
		useState<boolean>(false);
	const [sortOption, setSortOption] = useState<
		'거리순' | '인기순' | '추천순' | '최저가순'
	>('인기순');

	const { location, lat, lng } = useUserLocationStore();
	const initialLat = useRef(lat);
	const initialLng = useRef(lng);

	const [isRegisterLocationModalOpen, setIsRegisterLocationModalOpen] =
		useState<boolean>(false);

	const {
		data: userBusiness,
		isLoading,
		error,
		refetch,
	} = useGetUserBusiness(sortOption, 0, 20, lat, lng);

	useEffect(() => {
		if (!location || (lat === 0 && lng === 0)) {
			setSortOption('인기순');
		}
	}, [location, lat, lng]);

	useEffect(() => {
		const hasLatChanged = lat !== initialLat.current;
		const hasLngChanged = lng !== initialLng.current;
		if (hasLatChanged || hasLngChanged) {
			refetch();
			initialLat.current = lat;
			initialLng.current = lng;
		}
	}, [lat, lng]);

	const handleRegisterLocationBtnClick = () => {
		setIsRegisterLocationModalOpen(true);
	};

	const handleBackArrowClick = () => {
		router.back();
	};

	const handleSortOptionBtnClick = () => {
		setIsSortOptionModalOpen((prev) => !prev);
	};

	const handleChangeSortOption = (
		sortOption: '인기순' | '거리순' | '추천순' | '최저가순',
	) => {
		if (!location && !lat && !lng && sortOption === '거리순') {
			toast.error('위치를 먼저 설정해주세요.');
			return;
		}
		setSortOption(sortOption);
		setIsSortOptionModalOpen(false);
	};

	const handleBusinessItemClick = (businessId: number) => {
		router.push(`/user/view-business/${category}/${businessId}`);
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		toast.error(error.message);
	}

	if (!userBusiness) {
		return null;
	}

	return (
		<div className='flex flex-col'>
			<HeaderWithBackArrow
				headerTitle={category}
				handleBackArrowClick={handleBackArrowClick}
				hasRightConfirmButton={false}
			/>
			<div className='min-w-[320px] max-[600px] -mx-[16.2px]'>
				<LocationBar handleClick={handleRegisterLocationBtnClick} />
			</div>
			<div className='mt-[15px] mb-[10px] relative'>
				<RoundedButton
					buttonText={sortOption}
					handleClick={handleSortOptionBtnClick}
				/>
				{isSortOptionModalOpen && (
					<div className='absolute translate-y-[10px]'>
						<SortOptionModal
							handleSortOptionItemClick={handleChangeSortOption}
						/>
					</div>
				)}
			</div>
			<div className='flex flex-col w-full gap-[12px] overflow-auto scrollbar-hide h-[85vh]'>
				{userBusiness.data.map((businessItem) => (
					<div
						key={businessItem.businessId}
						onClick={() => {
							handleBusinessItemClick(businessItem.businessId);
						}}
					>
						<BusinessCard businessItem={businessItem} />
					</div>
				))}
			</div>
			{isRegisterLocationModalOpen && (
				<ModalLayout setIsModalOpen={setIsRegisterLocationModalOpen}>
					<RegisterLocationModal
						setIsModalOpen={setIsRegisterLocationModalOpen}
					/>
				</ModalLayout>
			)}
		</div>
	);
}

export default ViewBusinessList;
