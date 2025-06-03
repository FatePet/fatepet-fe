import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocationState {
	location: string;
	lat: number | null;
	lng: number | null;
	setLocation: (location: string) => void;
	setLatLng: (lat: number, lng: number) => void;
	setAddress: (location: string, lat: number, lng: number) => void;
	clearLocation: () => void;
}

const useUserLocationStore = create<LocationState>()(
	persist(
		(set) => ({
			location: '',
			lat: 0,
			lng: 0,
			setLocation: (location) =>
				set((state) => ({
					location,
					lat: state.lat,
					lng: state.lng,
				})),
			setLatLng: (lat: number, lng: number) =>
				set((state) => ({
					lat,
					lng,
					location: state.location,
				})),
			setAddress: (location, lat, lng) => set({ location, lat, lng }),
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
