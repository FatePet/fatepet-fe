import Image from 'next/image';
import React, { useState } from 'react'
import RegisterLocationButton from './RegisterLocationButton';

interface Props{
    location: string;
}

function LocationBar({ location }: Props) {

    const [isRegisterLocationModalOpen, setIsRegisterLocationModalOpen] = useState<boolean>(false);
    
    const handleRegisterLocationBtnClick = () => {
        setIsRegisterLocationModalOpen(true);
    }

    const displayText = !location ? "현재 위치에서 가까운 업체를 찾아 보세요." : location

  return (
		<div className='w-full min-h-[38px] flex justify-between items-center bg-p-brown px-[16px]'>
			<div className='flex gap-[8px] overflow-hidden'>
				{location && (
					<Image
						src='/icons/location/locationIcon-white.svg'
						alt='위치아이콘'
						width={11}
						height={13}
					/>
				)}
				<div className='text-[14px] font-bold text-white truncate'>
					{displayText}
				</div>
			</div>
			<RegisterLocationButton handleClick={handleRegisterLocationBtnClick} />
		</div>
	);
}

export default LocationBar