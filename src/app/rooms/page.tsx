import clientPromise from '@/lib/mongodb';
import { WithId, Document } from 'mongodb';

interface RoomType {
	_id: string,
	room_title: string,
	room_description: string,
	max_person: number,
	from_price: number,
}

async function getData () {
	const myDB = (await clientPromise).db('booking');
	const bookingColl = myDB.collection('room');
	
	const result = bookingColl.find();
	return result.toArray();
}

export default async function RoomsPage () {
	
	const data = await getData();
	
	return (
		<div className="">
			{data.map((room) => (
				<div key={room._id}>
					<div>Room: {room.room_title}</div>
					<div>Description: {room.room_description}</div>
				</div>
			))}
		</div>
	);
}