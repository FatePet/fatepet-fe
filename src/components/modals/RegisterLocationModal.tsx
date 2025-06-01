'use client';

import React from 'react';
import BigButton from '../buttons/BigButton';
import LongInput from '../inputs/LongInput';
import DaumPost from '../location/DaumPost';
import { convertCoordinatesToAddress } from '@/hooks/useGetAddressFromCoords';
import { convertAddressToCoordinates } from '@/hooks/useConvertAddressToCoordinates';
import useUserLocationStore from '@/store/useUserLocationStore';
import toast from 'react-hot-toast';

interface Props {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	address: string;
	setAddress: React.Dispatch<React.SetStateAction<string>>;
}

function RegisterLocationModal({ setIsModalOpen, address, setAddress }: Props) {
	const { setLocation } = useUserLocationStore();

	const handleSetCurrentLocationBtnClick = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					convertCoordinatesToAddress(latitude, longitude).then((result) => {
						setAddress(result?.roadAddress ?? '');
					});
				},
				(error) => {
					toast.error(`위치 가져오기 실패:${error}`);
				},
			);
		} else {
			toast.error('이 브라우저는 위치 정보를 지원하지 않습니다.');
		}
		return;
	};

	const handleCancelBtnClick = () => {
		setIsModalOpen(false);
	};

	const handleSaveBtnClick = () => {
		convertAddressToCoordinates(address).then((result) => {
			setLocation(address, result?.lat ?? 0, result?.lng ?? 0);
		});
		setIsModalOpen(false);
	};

	return (
		<div className='w-full max-w-[360px] h-[342px] rounded-[15px] bg-white shadow-md p-[10px] flex flex-col gap-[25px] justify-center'>
			<div className='text-[20px] font-black text-p-black'>내 위치 설정</div>
			<div className='w-full flex flex-col gap-[8px]'>
				<DaumPost setAddress={setAddress} />
				<BigButton
					buttonText='현재 위치로 설정'
					handleClick={handleSetCurrentLocationBtnClick}
				/>
				<LongInput
					disabled={true}
					errorMsg=''
					inputData={address}
					placeHolder='주소 검색을 진행해 주세요.'
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
