import React from 'react';

interface Props {
	buttonText: '취소' | '계속 입력' | '확인';
	handleClick: () => void;
}

function ModalButton({ buttonText, handleClick }: Props) {
	let className = 'h-[41px] rounded-[4px] font-bold text-[18px] cursor-pointer';
	if (buttonText === '확인') {
		className += ' w-[79px] bg-p-black text-white';
	} else if (buttonText === '취소') {
		className += ' w-[115px] bg-[#D9D9D9] text-black';
	} else if (buttonText === '계속 입력') {
		className += ' w-[115px] bg-p-black text-white';
	}

	return (
		<button className={className} onClick={handleClick}>
			{buttonText}
		</button>
	);
}

export default ModalButton;
