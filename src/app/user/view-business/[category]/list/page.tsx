'use client';
import RoundedButton from '@/components/buttons/RoundedButton';
import HeaderWithBackArrow from '@/components/headers/HeaderWithBackArrow';
import LocationBar from '@/components/location/LocationBar';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import SortOptionModal from './_components/SortOptionModal';
import { getUserBusinessListData } from './_components/getUserBusinessListData';
import BusinessCard from '@/components/user/BusinessCard';

function ViewBusinessList() {
	const router = useRouter();
	const params = useParams();
	const rawCategory = params.category as string;
	const category = decodeURIComponent(rawCategory);
	const [isSortOptionModalOpen, setIsSortOptionModalOpen] =
		useState<boolean>(false);
	const [sortOption, setSortOption] = useState<'거리순' | '인기순' | '추천순'>(
		'거리순',
	);
	const location = '';

	const handleBackArrowClick = () => {
		router.back();
	};

	const handleSortOptionBtnClick = () => {
		setIsSortOptionModalOpen((prev) => !prev);
	};

	const handleChangeSortOption = (
		sortOption: '인기순' | '거리순' | '추천순',
	) => {
		setSortOption(sortOption);
		setIsSortOptionModalOpen(false);
	};

	const handleBusinessItemClick = (businessId: number) => {
		router.push(`/user/view-business/${category}/${businessId}`)
	}

	return (
		<div className='flex flex-col'>
			<HeaderWithBackArrow
				headerTitle={category}
				handleBackArrowClick={handleBackArrowClick}
				hasRightConfirmButton={false}
			/>
			<div className='min-w-[320px] max-[600px] -mx-[16.2px]'>
				<LocationBar location={location} />
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
			<div className='flex flex-col w-full gap-[8px]'>
				{getUserBusinessListData.map((businessItem) => (
					<div key={businessItem.businessId} onClick={() => {handleBusinessItemClick(businessItem.businessId)}}>
						<BusinessCard businessItem={businessItem} />
					</div>
				))}
			</div>
		</div>
	);
}

export default ViewBusinessList;
