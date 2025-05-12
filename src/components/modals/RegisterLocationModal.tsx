'use client';

import React, { useState } from 'react';
import BigButton from '../buttons/BigButton';
import LongInput from '../inputs/LongInput';

interface Props {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	location: string;
}

function RegisterLocationModal({ setIsModalOpen, location }: Props) {
	const [inputAddress, setInputAddress] = useState<string>(location);
	const [inputAddressErrorMsg, setInputAddressErrorMsg] = useState<string>('');

	const handleSearchAddressBtnClick = () => {
		// 주소 검색
		return;
	};

	const handleSetCurrentLocationBtnClick = () => {
		// 현재 위치로 설정
		return;
	};

	const handleCancelBtnClick = () => {
		setIsModalOpen(false);
	};

	const handleSaveBtnClick = () => {
		// zustand에 location, latitude, longitude 저장해야함
		// location으로 latitude, longitude 변환할수있는 Geocoding 함수 만들면 될듯
		setIsModalOpen(false);
	};

	const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// 주소 입력 정규식 검사 필요함(예. 특수문자 금지)
		const value = e.target.value;
		setInputAddress(value);
	};

	return (
		<div className='w-full max-w-[360px] h-[342px] rounded-[15px] bg-white shadow-md p-[10px] flex flex-col gap-[25px] justify-center'>
			<div className='text-[20px] font-black text-p-black'>내 위치 설정</div>
			<div className='w-full flex flex-col gap-[8px]'>
				<BigButton
					buttonText='주소 검색'
					handleClick={handleSearchAddressBtnClick}
				/>
				<BigButton
					buttonText='현재 위치로 설정'
					handleClick={handleSetCurrentLocationBtnClick}
				/>
				<LongInput
					disabled={true}
					errorMsg={inputAddressErrorMsg}
					inputData={inputAddress}
					placeHolder='주소 검색을 진행해 주세요.'
					onChange={handleAddressInputChange}
				/>
			</div>
			<div className='w-full flex gap-[5px] text-[20px] font-bold text-white'>
				<button
					className='w-full h-[52px] bg-gray-middle border border-gray-middle rounded-[4px]'
					onClick={handleCancelBtnClick}
				>
					취소
				</button>
				<button
					className='w-full h-[52px] bg-p-brown border border-p-brown rounded-[4px]'
					onClick={handleSaveBtnClick}
				>
					완료
				</button>
			</div>
		</div>
	);
}

export default RegisterLocationModal;
