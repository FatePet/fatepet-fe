import { Dispatch, SetStateAction, useCallback } from 'react';
import { useGetCheckBusinessName } from '../api/admin/business/useGetCheckBusinessName';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/useAuthStore';

export function useCheckDuplicateName(
	businessName: string,
	isCheckedName: boolean,
	setIsCheckedName: Dispatch<SetStateAction<boolean>>,
	setErrorMsgs: React.Dispatch<React.SetStateAction<IBusinessErrorMsgType>>,
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
			const { error } = await refetch();

			if (error) {
				toast.error('이미 사용중인 이름입니다.');
				setErrorMsgs((prev) => ({
					...prev,
					nameError: '이미 사용중인 이름입니다.',
				}));
				return;
			}

			toast.success('사용 가능한 이름입니다.');
			setErrorMsgs((prev) => ({ ...prev, nameError: '' }));
			setIsCheckedName(true);
		} catch (err) {
			toast.error(`${err}`);
		}
	}, [
		isCheckedName,
		businessName,
		refetch,
		setAccessToken,
		setIsCheckedName,
		setErrorMsgs,
	]);

	return { checkDuplicateName };
}
