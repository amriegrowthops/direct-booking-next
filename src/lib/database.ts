import clientPromise from './mongodb';

export default async function databaseDriver () {
	try {
		const client = await clientPromise;
		const db = client.db('booking');
		
		return Promise.resolve(db);
	} catch {
		
		return Promise.reject(Error('Database error, something went wrong.'));
	}
}