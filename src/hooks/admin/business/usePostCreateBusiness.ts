import { postCreateBusiness } from '@/api/admin/business/postCreateBusiness';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const usePostCreateBusiness = (
	token: string,
	setAccessToken: (accessToken: string) => void,
) => {
	const router = useRouter();
	return useMutation({
		mutationFn: (body: IPostCreateBusinessRequestType) =>
			postCreateBusiness(body, token, setAccessToken),
		onSuccess: () => {
			alert('업체 등록 완료!');
			router.push('/admin/main');
		},
		onError: () => {
			alert('업체 등록에 실패했습니다.');
		},
	});
};
