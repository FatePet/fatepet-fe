import { postCreateBusiness } from '@/api/admin/business/postCreateBusiness';
import { useMutation } from '@tanstack/react-query';

export const usePostCreateBusiness = (token: string) => {
	return useMutation({
		mutationFn: (body: IPostCreateBusinessRequestType) =>
			postCreateBusiness(body, token),
	});
};
