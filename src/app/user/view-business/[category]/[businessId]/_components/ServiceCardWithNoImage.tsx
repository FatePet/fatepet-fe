'use client'
import React from 'react'

interface Props{
    name: string;
    description: string;
    price: string;
}

function ServiceCardWithNoImage({ name, description, price}: Props) {
  return (
      <div className="w-full min-h-[122px] rounded-[16px] flex flex-col gap-[10px] px-[8px] py-[10px] font-bold">
          <div className="text-[20px] text-[#000000]">{name}</div>
          <div className="text-[12px] text-[#47576A]">{description}</div>
          <div className="text-[12px] text-p-green flex justify-end max-w-[247px]">{price}</div>
    </div>
  )
}

export default ServiceCardWithNoImage