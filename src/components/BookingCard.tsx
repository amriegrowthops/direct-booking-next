'use client';

import {
	Card,
	CardHeader,
	CardBody,
	Image,
	CardFooter,
	Divider,
	Link,
	Chip,
	Button,
} from '@nextui-org/react';
import { useCartStore } from '@/store/CartStore';

interface BookingCardProp {
	roomId: string,
	roomName: string,
	roomDescription: string,
	roomPrice: string,
	bookBtnText: string,
	disabledBtn: boolean,
	bookNowHandler?: (bookingObj: any) => void,
}

export default function BookingCard ({ roomId, roomName, roomDescription, roomPrice, bookBtnText, disabledBtn = false, bookNowHandler }: BookingCardProp) {
	const { add: addCartRoom } = useCartStore();
	
	// const bookNowHandler = () => () => {
	// 	addCartRoom({
	// 		_id: roomId,
	// 		room_title: roomName,
	// 	});
	// };
	
	return (
		<Card className="BookingCard max-w-4xl">
			<div className="flex flex-col md:flex-row py-4">
				<CardHeader className="pb-0 pt-2 px-4 flex-col items-start w-auto max-w-full">
					<Image
						alt="Card background"
						className="object-cover rounded-xl"
						src="/family_villa.jpg"
						width={270}
					/>
				</CardHeader>
				<CardBody className="overflow-visible py-2 max-w-full md:pl-0 md:flex-row gap-y-4 md:gap-y-0">
					<div className="place-description flex-1">
						<h4 className="font-bold text-xl mb-1">{roomName}</h4>
						<p className="text-tiny mb-2 line-clamp-2">{roomDescription}</p>
						<small className="text-default-500">5 nights, Nov 22 – 27</small>
					</div>
					<div className="place-booking-info md:pl-6 flex-none flex flex-col md:justify-center gap-y-3">
						<h4 className="font-bold text-lg">{roomPrice} <span className="text-xs font-normal">per night</span></h4>
						<Button
							radius="full"
							size="md"
							fullWidth={true}
							variant="solid"
							color="primary"
							onClick={bookNowHandler}
							isDisabled={disabledBtn}
						>
							{bookBtnText}
						</Button>
					</div>
				</CardBody>
			</div>
			<Divider/>
			<CardFooter className="gap-3">
				<Chip>Private pool</Chip>
				<Chip>Sofa</Chip>
				<Chip>Hair Dyer</Chip>
				<Chip>Toiletries</Chip>
			</CardFooter>
		</Card>
	);
}