import { postRequestConsultation } from '@/api/user/business/postRequestConsultation';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

export const usePostRequestConsultation = (
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
	setIsRequestCompleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
	return useMutation({
		mutationFn: (body: IPostRequestConsultationRequestType) =>
			postRequestConsultation(body),
		onSuccess: (data) => {
			alert(data.message);
			setIsModalOpen(false);
			setIsRequestCompleteModalOpen(true)
		},
		onError: (error) => {
			alert(error.message);
		},
	});
};
