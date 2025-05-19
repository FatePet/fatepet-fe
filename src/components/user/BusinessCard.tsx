import Tag from '@/components/tag/Tag';
import Image from 'next/image';
import React from 'react'

interface Props {
	businessItem: IBusinessItemCommonType;
}

function BusinessCard({businessItem}: Props) {
  return (
		<div className='w-full min-h-[286px] rounded-[16px] bg-white border-[0.5px] border-p-green-lite flex flex-col shadow-md overflow-hidden cursor-pointer'>
			<div className='w-full h-[161px]'>
				<img
					src={businessItem.thumbnailUrl}
					alt='업체대표이미지'
					className='w-full h-full'
				/>
			</div>
			<div className='flex flex-col gap-[5px] p-[20px] text-[13px] font-semibold text-[#47576A]'>
				<div className='flex justify-between text-[20px] font-black text-p-black'>
					<div>{businessItem.name}</div>
					<Tag tagText={businessItem.category} />
				</div>
				<div className='flex gap-[5px]'>
					<Image
						src='/icons/businessCard/locationIcon-black.svg'
						alt='위치아이콘'
						width={11}
						height={13}
					/>
					<div>{businessItem.address}</div>
				</div>
				<div className='flex gap-[5px]'>
					<Image
						src='/icons/businessCard/timeIcon.svg'
						alt='시계아이콘'
						width={12}
						height={12}
					/>
					<div>{businessItem.businessHours}</div>
				</div>
				<div className='flex gap-[5px]'>
					<Image
						src='/icons/businessCard/chatIcon.svg'
						alt='채팅아이콘'
						width={11}
						height={11}
					/>
					<div>{businessItem.phoneNumber}</div>
				</div>
			</div>
		</div>
	);
}

export default BusinessCard