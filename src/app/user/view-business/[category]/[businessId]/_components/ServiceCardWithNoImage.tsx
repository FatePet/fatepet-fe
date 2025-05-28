'use client'
import React from 'react'

interface Props{
    name: string;
    description: string;
    price: string;
}

function ServiceCardWithNoImage({ name, description, price}: Props) {
  return (
		<div className='w-full rounded-[16px] flex flex-col gap-[10px] px-[8px] py-[10px] font-bold border-[0.5px] border-p-green-lite shadow-lg'>
			<div className='text-[20px] text-[#000000]'>{name}</div>
			<div className='text-[12px] text-[#47576A]'>{description}</div>
			<div className='w-full text-[12px] text-p-green flex justify-end'>
				<div className='max-w-[250px]'>{price}</div>
			</div>
		</div>
	);
}

export default ServiceCardWithNoImage