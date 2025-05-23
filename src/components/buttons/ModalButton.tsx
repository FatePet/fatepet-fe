import React from 'react';

interface Props {
	buttonText: '등록 취소' | '계속 입력' | '확인' | "업체 삭제" | '취소' | '서비스 삭제';
	handleClick: () => void;
}

function ModalButton({ buttonText, handleClick }: Props) {
	let className = 'h-[30px] rounded-[4px] font-bold text-[14px] cursor-pointer text-white';
	if (buttonText === '확인') {
		className += ' w-[65px] bg-p-black';
	} else if (buttonText === '등록 취소' || buttonText === "업체 삭제") {
		className += ' w-[92px] bg-p-red';
	} else if (buttonText === '계속 입력' || buttonText === '취소') {
		className += ' w-[92px] bg-p-black ';
	} 
	 else if (buttonText === '서비스 삭제') {
		className += ' w-[104px] bg-p-red ';
	} 

	return (
		<button className={className} onClick={handleClick}>
			{buttonText}
		</button>
	);
}

export default ModalButton;
