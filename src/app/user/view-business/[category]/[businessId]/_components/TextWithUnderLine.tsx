import React from 'react';

interface Props {
	itemType: string;
}

function TextWithUnderLine({ itemType }: Props) {
	return (
		<div className='flex flex-col w-full gap-[2px]'>
			<h2 className='text-[20px] font-black text-p-black'>{itemType}</h2>
			<div className='w-full h-[4px] bg-black' />
		</div>
	);
}

export default TextWithUnderLine;
