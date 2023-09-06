import { create } from 'zustand';
import useFetch from 'http-react';

interface RoomType {
	room_id: string,
	room_title: string,
	checkin_date: string,
	checkout_date: string,
}

type CartStore = {
	cart: RoomType[],
	add: (cartObj: Object) => void,
	remove: (cartId: string) => void,
	removeAll: () => void,
	
}

export const useCartStore = create<CartStore>((set, get) => ({
	cart: [],
	add: (item) => {
		set((state) => ({
			cart: [
				...state.cart,
				item as RoomType,
			],
		}));
	},
	remove: (itemId) => {
		set((state) => ({
			cart: state.cart.filter((item) => item.room_id !== itemId),
		}));
	},
	removeAll: () => {
		set((state) => ({
			cart: [],
		}));
	},
}));