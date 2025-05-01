import React from 'react';
import { MiniButton } from '../buttons/MiniButton';
import RoundedButton from '../buttons/RoundedButton';

interface Props {
	type: 'user' | 'admin';
	headerTitle: string;
	handleButtonClick: () => void;
}

function HeaderWithRightbutton({
	type,
	headerTitle,
	handleButtonClick,
}: Props) {
	const headerTitleStyle =
		type === 'admin' ? 'text-[20px] font-black' : 'text-[14px] font-bold';
	return (
		<div className='w-full h-[51px] flex justify-between items-center text-black bg-white'>
			<div className={headerTitleStyle}>{headerTitle}</div>
			{type === 'admin' ? (
				<MiniButton buttonText='로그아웃' handleClick={handleButtonClick} />
			) : (
				<RoundedButton
					buttonText='내 위치 설정'
					handleClick={handleButtonClick}
				/>
			)}
		</div>
	);
}

export default HeaderWithRightbutton;
