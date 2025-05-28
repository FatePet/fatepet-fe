import Image from 'next/image';
import React from 'react';

function LoadingSpinner() {
	return (
		<div className='bg-white flex justify-center items-center w-full h-screen z-[100]'>
			<Image
				src='/icons/loading/loadingSpinner.svg'
				alt='로딩 스피너'
				width={100}
				height={100}
			/>
		</div>
	);
}

export default LoadingSpinner;
