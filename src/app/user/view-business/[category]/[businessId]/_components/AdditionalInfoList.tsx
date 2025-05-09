import React from 'react'

interface Props{
    additionalInfo: IAdditionalInfoType;
}

function AdditionalInfoList({additionalInfo}:Props) {
  return (
		<div className='w-full flex flex-col gap-[10px]'>
			<div className='w-full rounded-[10px] flex flex-col gap-[10px]'>
				{additionalInfo.imageUrl.map((image) => (
					<img
						src={image}
						alt='기타정보사진'
						className='w-full rounded-[10px] h-[232px]'
					/>
				))}
			</div>
			<div className='w-full text-[12px] text-[#47576A] font-bold'>
				{additionalInfo.description}
			</div>
		</div>
	);
}

export default AdditionalInfoList