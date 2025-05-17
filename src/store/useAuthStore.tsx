import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
	accessToken: string;
	setAccessToken: (accessToken: string) => void;
	clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			accessToken: '',
			setAccessToken: (accessToken) => set({ accessToken }),
			clearAuth: () => {
				set({ accessToken: '' });
				localStorage.removeItem('auth-storage');
			},
		}),
		{
			name: 'auth-storage',
		},
	),
);

export default useAuthStore;
