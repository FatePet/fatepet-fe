import { postRequestConsultation } from '@/api/user/business/postRequestConsultation';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

export const usePostRequestConsultation = (
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
	setIsRequestCompleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
	return useMutation({
		mutationFn: (body: IPostRequestConsultationRequestType) =>
			postRequestConsultation(body),
		onMutate: () => {
			toast.loading('처리 중... ', {
				id: 'requestConsultationLoading',
			});
		},
		onSuccess: (data) => {
			toast.dismiss('requestConsultationLoading');
			toast.success(data.message);
			setIsModalOpen(false);
			setIsRequestCompleteModalOpen(true)
		},
		onError: (error) => {
			toast.dismiss('requestConsultationLoading');
			toast.error(error.message);
		},
	});
};
