import BigButton from '@/components/buttons/BigButton';
import TextArea from '@/components/inputs/TextArea';
import React, { useState } from 'react';

function MoreInfoArea() {
	const [moreInfo, setMoreInfo] = useState<string>('');

	const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMoreInfo(e.target.value);
	};

	return (
		<div className='flex flex-col gap-[20px]'>
			<div className='flex flex-col gap-[10px]'>
				<BigButton
					buttonText='사진 업로드'
					handleClick={() => {
						return;
					}}
				/>
			</div>
			<div>
				<TextArea
					type='more'
					inputData={moreInfo}
					onChange={onTextAreaChange}
				/>
			</div>
		</div>
	);
}

export default MoreInfoArea;
