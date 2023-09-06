import { Input } from '@nextui-org/react';

export default function Login () {
	return (
		<div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
			<Input
				type="email"
				label="Email address"
				placeholder="Enter your email"
			/>
			<Input
				type="password"
				label="Password"
				placeholder="Enter your password"
			/>
		</div>
	);
}