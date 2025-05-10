import React from 'react'


interface Props {
	name: string;
	description: string;
    price: string;
    imageUrl: string;
}

function ServiceCardWithImage({name, description, price, imageUrl }:Props) {
  return (
		<div className='flex flex-col gap-[10px] px-[8px] py-[10px] rounded-[16px] font-bold w-full border-[0.5px] border-p-green-lite shadow-md'>
			<div className='w-full h-[216px] rounded-[10px]'>
				<img
					src={imageUrl}
					alt='서비스이미지'
					className='w-full h-full rounded-[10px]'
				/>
			</div>
			<div className='text-[20px] text-[#000000]'>{name}</div>
			<div className='text-[12px] text-[#47576A]'>{description}</div>
			<div className='w-full text-p-green text-[12px] flex justify-end'>
				<div className='max-w-[250px]'>{price}</div>
			</div>
		</div>
	);
}

export default ServiceCardWithImage