import React from 'react';

interface Props {
	headerTitle: string;
}

function HeaderWithOnlyText({ headerTitle }: Props) {
	return (
		<div className='w-full h-[51px] flex justify-start items-center text-[20px] font-black text-black bg-white'>
			<div>{headerTitle}</div>
		</div>
	);
}

export default HeaderWithOnlyText;
