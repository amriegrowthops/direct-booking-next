import databaseDriver from '@/lib/database';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { RoomType } from '@/Models/Types/Room';

interface BookedRoomType {
	room_id: ObjectId | string,
	room_title: string,
	checkin_date: string,
	checkout_date: string,
}

export async function POST (request: Request) {
	
	try {
		const requestData = await request.json();
		
		if (!requestData || !requestData.length || Object.keys(requestData[0]).length === 0) {
			return NextResponse.json({
				message: 'Error request data',
			}, { status: 400 });
		}
		
		const requestBookRoomIds = requestData.map((body: BookedRoomType) => {
			return new ObjectId(body.room_id);
		});
		
		const db = await databaseDriver();
		const rooms = await db
			.collection('room_type')
			.find({
				'_id': {
					'$in': requestBookRoomIds,
				},
			}, { projection: { 'room_title': 1 } })
			.toArray();
		
		const mappedBookedRooms = requestData.map((data: BookedRoomType, indexItem: number) => {
			
			const newData = rooms.filter((room) => {
				return (new ObjectId(room._id).toString() === data.room_id);
			});
			
			return {
				room_id: newData[0]._id,
				room_title: newData[0].room_title,
				checkin_date: data.checkin_date,
				checkout_date: data.checkout_date,
			} as BookedRoomType;
		});
		
		
		const results = await db
			.collection<BookedRoomType[]>('booked_rooms')
			.insertMany(mappedBookedRooms);
			
		return NextResponse.json({
			message: results,
		}, { status: 201 });
	} catch (error) {
		return NextResponse.json({
			message: 'Something went wrong with JSON input',
		}, { status: 400 });
	}
}