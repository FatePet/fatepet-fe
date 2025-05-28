import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import categoryStyles from './categoryStyles';

interface Props {
	category: '장묘' | '악세사리' | '브리더' | '행동상담';
}

function UserCategory({ category }: Props) {
	const router = useRouter();
	const { themeColor, content, iconUrl, width, height } = categoryStyles[category];


	const handleCategoryClick = () => {
		router.push(`/user/view-business/${category}/list`);
	};

	return (
		<div
			className={`${themeColor} p-[20px] rounded-2xl font-bold whitespace-pre cursor-pointer flex flex-col justify-between`}
			onClick={handleCategoryClick}
		>
			<div>{content}</div>
			{iconUrl && (
				<div className='w-full'>
					<Image
						src={iconUrl}
						alt={`${category} icon`}
						width={width}
						height={height}
						className='flex justify-self-end'
					/>
				</div>
			)}
		</div>
	);
}

export default UserCategory;
