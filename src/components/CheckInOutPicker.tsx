'use client';
import { Input, Button } from '@nextui-org/react';
import { useState, useEffect } from 'react';

interface CheckInOutProps {
	checkInName?: string,
	checkOutName?: string,
	placeholderText?: string,
	checkInLabelText?: string,
	checkOutLabelText?: string,
	checkInDateCallback?: (newDate: string) => void;
	checkOutDateCallback?: (newDate: string) => void;
	checkInDefaultValue?: string,
	checkOutDefaultValue?: string,
}

export default function CheckInOutPicker (props: CheckInOutProps) {
	
	return (
		<div className="flex gap-x-4 w-full">
			<Input
				name={props.checkInName}
				type="date"
				label={props.checkInLabelText}
				placeholder={props.placeholderText}
				onChange={(e) => props.checkInDateCallback?.(e.target.value)}
				defaultValue={props.checkInDefaultValue}
			/>
			<Input
				name={props.checkOutName}
				type="date"
				label={props.checkOutLabelText}
				placeholder={props.placeholderText}
				onChange={(e) => props.checkOutDateCallback?.(e.target.value)}
				defaultValue={props.checkOutDefaultValue}
			/>
		</div>
	);
}