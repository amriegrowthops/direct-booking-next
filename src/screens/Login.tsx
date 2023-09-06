'use client';
import { Input, Button } from '@nextui-org/react';
import Image from 'next/image';
import FormWrapper from '@/components/FormWrapper';
import TextField from '@/components/TextField';


export default function Login () {
	
	
	const submitValidHandler = (event) => {
		console.log('submit valid', event);
		console.log('Here weee go');
	};
	
	const submitInvalidHandler = (event) => {
		console.log('submit invalid', event);
	};
	
	return (
		<div className="max-w-sm w-full">
			<div className="mb-2">
				<Image
					src="/next.svg"
					alt="Picture of the author"
					width={500}
					height={500}
					priority
					style={{
						maxWidth: 150,
						margin: 'auto',
					}}
				/>
				
			</div>
			<FormWrapper
				submitValid={submitValidHandler}
				submitInvalid={submitInvalidHandler}
			>
				<div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
					<TextField
						name="emailAddressField"
						inputType="email"
						isMandatory={true}
						labelText="Email"
						placeholderText="Enter your email"
						errorMessage="Email is required"
					/>
					<TextField
						name="passwordField"
						inputType="password"
						labelText="Password"
						placeholderText="Enter your password"
						isMandatory={true}
						errorMessage="Password is required"
					/>
					
					<Button color="primary" type="submit">Submit</Button>
				</div>
			</FormWrapper>
		</div>
	);
}