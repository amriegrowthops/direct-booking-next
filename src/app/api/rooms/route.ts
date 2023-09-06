import { NextResponse } from 'next/server';
import databaseDriver from '@/lib/database';
import { ObjectId } from 'mongodb';

import { RoomType } from '@/Models/Types/Room';

export async function GET () {
	
	try {
		const db = await databaseDriver();
		
		const result = await db
			.collection('room_type')
			.find({})
			.toArray();
		
		return NextResponse.json(result);
	} catch {
		return NextResponse.json('error', {
			status: 500,
		});
	}
}

export async function POST (request: Request) {
	
	
	try {
		const res = await request.json();
		const db = await databaseDriver();

		const bookedRooms = await db
			.collection('booked_rooms')
			.find({
				$or: [
					{
						// check-in date is between check-in and check-out from body request
						'checkin_date': {
							'$gte': res.checkIn,
							'$lte': res.checkOut,
						},
						// check-out date is between check-in and check-out from body request
						'checkout_date': {
							'$gte': res.checkIn,
							'$lte': res.checkOut,
						},
						'$and': [
							{
								'checkin_date': {
									'$lte': res.checkIn,
								},
							},
							{
								'checkout_date': {
									'$lte': res.checkOut,
								},
							},
						],
					},
				],
			})
			.toArray();
			
		const roomIds = bookedRooms.map((room) => new ObjectId(room.room_id));
		const availableRooms = await db
			.collection<RoomType[]>('room_type')
			.find({
				'_id': {
					'$nin': roomIds,
				},
			})
			.toArray();
			
			
		return NextResponse.json(availableRooms);
	} catch (error) {
		return NextResponse.json('error', {
			status: 500,
		});
	}
}