import React from 'react';
import { MiniButton } from '../buttons/MiniButton';
import RoundedButton from '../buttons/RoundedButton';

interface Props {
	headerTitle: string;
	buttonTitle: string;
	handleButtonClick: () => void;
}

function HeaderWithRightbutton({ headerTitle, handleButtonClick,buttonTitle }: Props) {
	return (
		<div className='w-full h-[51px] flex justify-between items-center text-black bg-white'>
			<div className='text-[20px] font-black'>{headerTitle}</div>

			<MiniButton buttonText={buttonTitle} handleClick={handleButtonClick} />
		</div>
	);
}

export default HeaderWithRightbutton;
