'use client';

import BookingList from '@/components/BookingList';
import BookingCart from '@/components/BookingCart';
import {
	// Table components
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
} from '@nextui-org/react';
import { useCartStore } from '@/store/CartStore';

interface RoomType {
	_id: string,
	room_title: string,
	room_description: string,
	max_person: number,
	from_price: number,
}

export default function Home () {
	return (
		<>
			<div className="flex flex-col justify-center items-center h-full w-full gap-y-6">
				<BookingList />
				<BookingCart />
			</div>
		</>
	);
}
