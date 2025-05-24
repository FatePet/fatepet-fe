import React from 'react';

interface Props {
	handleSortOptionItemClick: (
		sortOption: '거리순' | '인기순' | '추천순',
	) => void;
}

function SortOptionModal({ handleSortOptionItemClick }: Props) {
	const sortOptionArr: Array<'거리순' | '인기순' | '추천순'> = [
		'거리순',
		'인기순',
		'추천순',
	];
	return (
		<div className='flex flex-col w-[123px] h-[116px] rounded-[11px] bg-p-black font-bold text-[12px] text-white items-center'>
			{sortOptionArr.map((sortOption, index) => (
				<div
					key={sortOption}
					className='w-full flex flex-col items-center justify-center'
				>
					<div
						className='w-full h-[38px] flex items-center justify-center cursor-pointer'
						onClick={() => {
							handleSortOptionItemClick(sortOption);
						}}
					>
						{sortOption}
					</div>
					{index !== 2 && <div className='w-full h-[1px] bg-gray-middle' />}
				</div>
			))}
		</div>
	);
}

export default SortOptionModal;
