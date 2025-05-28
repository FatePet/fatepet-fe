import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
	accessToken: string;
	setAccessToken: (accessToken: string) => void;
	isHydrated: boolean;
	clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			accessToken: '',
			setAccessToken: (accessToken) => set({ accessToken }),
			isHydrated: false,
			clearAuth: () => {
				set({ accessToken: '' });
			},
		}),
		{
			name: 'auth-storage',
			onRehydrateStorage: () => {
				// 이 리턴값이 hydration 후 실행됨
				return (state) => {
					if (state) {
						state.isHydrated = true;
					}
				};
			},
		},
	),
);

export default useAuthStore;
