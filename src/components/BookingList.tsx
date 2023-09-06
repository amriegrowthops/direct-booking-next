'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { currencyParser } from '@/helpers/currency';
import { useCartStore } from '@/store/CartStore';
import useFetch, { revalidate } from 'http-react';

import BookingCard from '@/components/BookingCard';
import CheckInOutPicker from '@/components/CheckInOutPicker';
import {
	Button,
	Spinner,
	
	// Spacing component
	Spacer,
	
	Card,
	Skeleton,
} from '@nextui-org/react';

import { RoomType } from '@/Models/Types/Room';

export default function BookingList () {
	// const { data: roomData, loading, error } = useFetch('/api/rooms');
	const params = useSearchParams();
	
	const { add: addCartRoom, cart: cartItems } = useCartStore();
	
	const [ checkInDate, setCheckInDate ] = useState<string>('');
	const [ checkOutDate, setCheckOutDate ] = useState<string>('');
	
	const [ availableRoomData, setRoomData ] = useState<RoomType[]>([]);
	const [ isLoading, setLoading ] = useState<boolean>(false);
	
	const searchBtnHandler = () => {
		revalidate('POST /api/rooms');
	};
	
	useFetch('/api/rooms', {
		method: 'POST',
		body: {
			checkIn: checkInDate,
			checkOut: checkOutDate,
		},
		onResolve (data) {
			setRoomData(data);
			setLoading(false);
		},
		onFetchStart (res, config, ctx) {
			setLoading(true);
		},
	});
	
	useEffect(() => {
		setCheckInDate(params.get('checkInDate') || '');
		setCheckOutDate(params.get('checkOutDate') || '');
	}, [params]);
	
	const isRoomInCart = (roomId: string) => {
		const isExist = cartItems.some((item) => item.room_id === roomId);

		return isExist;
	};
	
	return (
		<>
			<div className="w-full max-w-4xl flex justify-between items-center gap-x-4 mt-4">
				<CheckInOutPicker
					checkInName="checkInDateRoom"
					checkOutName="checkOutDateRoom"
					placeholderText="Select date"
					checkInLabelText="Check-in"
					checkOutLabelText="Check-out"
					checkInDateCallback={(newDate) => setCheckInDate(newDate)}
					checkOutDateCallback={(newDate) => setCheckOutDate(newDate)}
					checkInDefaultValue={checkInDate}
					checkOutDefaultValue={checkOutDate}
				/>
				<Button
					radius="full"
					size="lg"
					isDisabled={!checkInDate || !checkOutDate}
					onClick={searchBtnHandler}
				>
					Search
				</Button>
			</div>
			{isLoading ? <CardSkeleton /> :
				<div className="flex flex-col gap-y-4">
					{availableRoomData.map((room: RoomType) => (
						<BookingCard
							key={room._id}
							roomId={room._id}
							roomName={room.room_title}
							roomDescription={room.room_description}
							roomPrice={currencyParser({
								price: room.from_price,
								currency: 'MYR',
								language: 'en',
							})}
							bookBtnText="Reserve"
							disabledBtn={!checkInDate || !checkOutDate || isRoomInCart(room._id)}
							bookNowHandler={() => addCartRoom({
								room_id: room._id,
								room_title: room.room_title,
								checkin_date: checkInDate,
								checkout_date: checkOutDate,
							})}
						/>
					))}
						
					<Spacer y={96} />
				</div>
			}
		</>
	);
}


function CardSkeleton () {
	return (
		<div className="max-w-4xl w-full flex items-center gap-3">
			<div>
				<Skeleton className="flex rounded-full w-12 h-12"/>
			</div>
			<div className="w-full flex flex-col gap-2">
				<Skeleton className="h-3 w-3/5 rounded-lg"/>
				<Skeleton className="h-3 w-4/5 rounded-lg"/>
			</div>
		</div>
	);
}