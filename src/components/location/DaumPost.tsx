import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import BigButton from '../buttons/BigButton';

interface DaumPostcodeData {
	address: string;
	addressType: string;
	bname: string;
	buildingName: string;
	sido: string;
	sigungu: string;
}

interface Props {
	setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const DaumPost: React.FC<Props> = ({ setAddress }) => {
	const postcodeScriptUrl =
		'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
	const open = useDaumPostcodePopup(postcodeScriptUrl);

	const handleComplete = (data: DaumPostcodeData) => {
		let fullAddress = data.address;
		let extraAddress = '';
		let localAddress = data.sido + ' ' + data.sigungu;

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress +=
					extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress = fullAddress.replace(localAddress, '');
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}

		setAddress(fullAddress);
	};

	const handleClick = () => {
		open({ onComplete: handleComplete });
	};

	return (
		<div>
			<BigButton buttonText='주소검색' handleClick={handleClick} />
		</div>
	);
};

export default DaumPost;
