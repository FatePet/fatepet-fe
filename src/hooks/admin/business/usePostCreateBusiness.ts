import { postCreateBusiness } from '@/api/admin/business/postCreateBusiness';
import { useMutation } from '@tanstack/react-query';

export const usePostCreateBusiness = (token: string) => {
	return useMutation({
		mutationFn: (body: IPostCreateBusinessRequestType) =>
			postCreateBusiness(body, token),
		onSuccess: () => {
			alert('업체 등록 완료!');
		},
		onError: () => {
			alert('업체 등록에 실패했습니다.');
		},
	});
};
