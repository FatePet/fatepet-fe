import { Dispatch, SetStateAction, useCallback } from 'react';
import { useGetCheckBusinessName } from './api/admin/business/useGetCheckBusinessName';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/useAuthStore';

export function useCheckDuplicateName(
	businessName: string,
	isCheckedName: boolean,
	setIsCheckedName: Dispatch<SetStateAction<boolean>>,
	setNameError: Dispatch<SetStateAction<string>>,
) {
	const { accessToken, setAccessToken } = useAuthStore();
	const { refetch } = useGetCheckBusinessName(
		accessToken,
		businessName,
		setAccessToken,
		isCheckedName,
	);

	const checkDuplicateName = useCallback(async () => {
		if (isCheckedName || businessName === '') return;

		try {
			const { data: checkNameData, error } = await refetch();

			if (checkNameData) {
				if (checkNameData.status === 200) {
					toast.success('사용 가능한 이름입니다.');
					setNameError('');
					setIsCheckedName(true);
				} else {
					toast.error('이미 사용중인 이름입니다.');
					setNameError('이미 사용중인 이름입니다.');
				}
			}

			if (error) {
				toast.error(error.message);
			}
		} catch (err) {
			console.error(err);
		}
	}, [
		isCheckedName,
		businessName,
		refetch,
		setAccessToken,
		setIsCheckedName,
		setNameError,
	]);

	return { checkDuplicateName };
}
