import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocationState {
	location: string;
	lat: number | null;
	lng: number | null;
	setLocation: (location: string, lat: number, lng: number) => void;
	clearLocation: () => void;
}

const useUserLocationStore = create<LocationState>()(
	persist(
		(set) => ({
			location: '',
			lat: 0,
			lng: 0,
			setLocation: (location, lat, lng) => set({ location, lat, lng }),
			clearLocation: () => {
				set({ location: '', lat: 0, lng: 0 });
				localStorage.removeItem('selectedLocation-storage');
			},
		}),
		{
			name: 'location-storage',
		},
	),
);

export default useUserLocationStore;
