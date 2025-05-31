import React from 'react';
import BigButton from '@/components/buttons/BigButton';
import EditServiceCard from './EditServiceCard';

interface Props {
	originServiceList: IServiceDetailType[];
	addServiceList: IServiceItemType[];
	setOriginServiceList: React.Dispatch<
		React.SetStateAction<IServiceDetailType[]>
	>;
	updateServiceList: IUpdateServiceItemType[];
	setUpdateServiceList: React.Dispatch<
		React.SetStateAction<IUpdateServiceItemType[]>
	>;
	setAddServiceList: React.Dispatch<React.SetStateAction<IServiceItemType[]>>;
	serviceImageList: (File | null)[];
	setServiceImageList: React.Dispatch<React.SetStateAction<(File | null)[]>>;
	setUpdateServiceImageList: React.Dispatch<
		React.SetStateAction<(File | null)[]>
	>;
	setAddServiceImageList: React.Dispatch<React.SetStateAction<(File | null)[]>>;
	setRemoveServiceIds: React.Dispatch<React.SetStateAction<number[]>>;
	serviceErrorMsgs: string[];
}

function EditServiceInfoArea({
	originServiceList,
	setOriginServiceList,
	updateServiceList,
	setUpdateServiceList,
	addServiceList,
	setAddServiceList,
	setServiceImageList,
	setUpdateServiceImageList,
	setAddServiceImageList,
	setRemoveServiceIds,
	serviceErrorMsgs,
}: Props) {
	const handleAddService = () => {
		if (originServiceList.length + addServiceList.length === 100) {
			alert('서비스는 최대 100개까지 추가 가능합니다.');
			return;
		}

		const newServiceItem: IServiceItemType = {
			type: '기본항목',
			name: '',
			description: '',
			priceType: '직접입력',
			price: '',
			image: false,
		};

		setAddServiceList((prev) => [...prev, newServiceItem]);
	};

	return (
		<div className='flex flex-col gap-[10px]'>
			<p className='text-p-red text-[12px] mb-[10px] text-right font-bold'>
				*최소 1개 이상의 서비스를 등록해 주세요
			</p>
			{originServiceList.map((service, idx) => (
				<EditServiceCard
					key={idx}
					isOrigin={true}
					serviceCount={idx + 1}
					serviceIdx={idx}
					serviceId={service.serviceId}
					serviceItem={service}
					setOriginServiceList={setOriginServiceList}
					addServiceList={addServiceList}
					setAddServiceList={setAddServiceList}
					updateServiceList={updateServiceList}
					setUpdateServiceList={setUpdateServiceList}
					setServiceImageList={setServiceImageList}
					setAddServiceImageList={setAddServiceImageList}
					setUpdateServiceImageList={setUpdateServiceImageList}
					setRemoveServiceIds={setRemoveServiceIds}
					errorMsg={serviceErrorMsgs[idx]}
				/>
			))}
			{addServiceList.map((service, idx) => (
				<EditServiceCard
					key={idx}
					isOrigin={false}
					serviceCount={idx + 1 + originServiceList.length}
					serviceIdx={idx}
					serviceItem={service}
					setOriginServiceList={setOriginServiceList}
					addServiceList={addServiceList}
					setAddServiceList={setAddServiceList}
					updateServiceList={updateServiceList}
					setUpdateServiceList={setUpdateServiceList}
					setServiceImageList={setServiceImageList}
					setAddServiceImageList={setAddServiceImageList}
					setUpdateServiceImageList={setUpdateServiceImageList}
					setRemoveServiceIds={setRemoveServiceIds}
					errorMsg={serviceErrorMsgs[idx]}
				/>
			))}

			<div className='relative'>
				<div className='absolute w-[22px] h-[18px] bg-p-green text-white flex justify-center items-center rounded-[4px] top-[15px] right-[170px]'>
					{originServiceList.length}
				</div>
				<BigButton buttonText='서비스 추가' handleClick={handleAddService} />
			</div>
		</div>
	);
}

export default EditServiceInfoArea;
