import React from 'react';

interface Props {
	tagText: string;
}

function Tag({ tagText }: Props) {
	return (
		<div className='min-w-[45px] h-[20px] px-[12px] bg-p-green text-white text-[12px] font-bold rounded-[10px] flex justify-center items-center'>
			{tagText}
		</div>
	);
}

export default Tag;
