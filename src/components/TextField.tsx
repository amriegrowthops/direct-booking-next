import { Input, Button } from '@nextui-org/react';
import { useField, useFormikContext, useFormik } from 'formik';
import { useState } from 'react';
import { string } from 'yup';

type TextFieldProps = {
	name: string,
	labelText: string,
	placeholderText: string,
	inputType: string,
	isMandatory?: Boolean,
	errorMessage?: string,
}

export default function TextField (props: TextFieldProps) {
	
	const [ field, meta, helpers ] = useField({
		name: props.name,
		validate: (value) => {
			
			let yupSchema = string().nullable();
			
			if (props.isMandatory) {
				yupSchema = yupSchema.required(props.errorMessage);
			}
			
			
			try {
				yupSchema.validateSync(value);
				
				return undefined;
			} catch (err) {
				return props.errorMessage;
			}
		},
	});
	const { value, error, touched } = meta;
	const { setValue, setError, setTouched } = helpers;
	
	return (
		<>
			{/* <Input
				type="email"
				label="Email address"
				name={props.name}
				placeholder="Enter your email"
				isRequired
				onChange={(e) => setFieldValue(props.name, e.target.value)}
			/> */}
			<Input
				type={props.inputType}
				label={props.labelText}
				placeholder={props.placeholderText}
				validationState={error ? 'invalid' : 'valid'}
				errorMessage={error}
				onChange={(event) => setValue(event.target.value, true)}
				value={value ?? ''}
			/>
			{/* {error} */}
		</>
	);
}