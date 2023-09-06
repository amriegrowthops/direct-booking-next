'use client';

import { useCartStore } from '@/store/CartStore';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
} from '@nextui-org/react';
import useFetch, { revalidate } from 'http-react';

export default function BookingCart () {
	const { cart: allCartItem, remove: removeCartItem } = useCartStore();
	
	useFetch('/api/book-room', {
		method: 'POST',
		body: [...allCartItem],
	});
	
	const placeOrderHandler = () => {
		revalidate('POST /api/book-room');
	};
	
	const removeOrderItem = (itemId: any) => () => {
		removeCartItem(itemId);
	};
	
	return (
		<>
			{allCartItem.length ? <div className="room-cart fixed z-30 bottom-0 left-0 w-full bg-content1">
				<Table
					aria-label="Example static collection table"
					radius="none"
				>
					<TableHeader>
						<TableColumn>ROOM</TableColumn>
						<TableColumn>CHECK-IN DATE</TableColumn>
						<TableColumn>CHECK-OUT DATE</TableColumn>
						<TableColumn>ACTIONS</TableColumn>
					</TableHeader>
					<TableBody>
						{allCartItem.map((item, itemIndex) => (
							<TableRow key={`${item.room_title} ${itemIndex}`}>
								<TableCell>{item.room_title}</TableCell>
								<TableCell>{item.checkin_date}</TableCell>
								<TableCell>{item.checkout_date}</TableCell>
								<TableCell>
									<Button
										size="sm"
										onClick={removeOrderItem(item.room_id)}
									>
										Remove
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Button
					radius="full"
					size="lg"
					className="float-right my-4 mr-4"
					onClick={placeOrderHandler}
				>Place order</Button>
			</div> : null}
		</>
	);
}