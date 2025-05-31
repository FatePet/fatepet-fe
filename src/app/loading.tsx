import LoadingSpinner from '@/components/loading/LoadingSpinner';
import React from 'react';

function loading() {
	return (
		<div className='flex justify-center items-center w-full h-screen'>
			<LoadingSpinner />
		</div>
	);
}

export default loading;
