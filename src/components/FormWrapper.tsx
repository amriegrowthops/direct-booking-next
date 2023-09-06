import { useFormikContext, useFormik, Formik, Form, Field, useField } from 'formik';
import { useEffect, useState } from 'react';
import { isEqual as _isEqual } from 'lodash';

type FormWrapperProps = {
	children: React.ReactNode,
	submitValid?: any,
	submitInvalid?: any,
}


export default function FormWrapper ({ children, submitValid, submitInvalid, ...props }: FormWrapperProps) {
	
	const onSubmit = async (...args: any[]) => {
		submitValid(...args);
	};
	
	const onError = async (...args: any[]) => {
		submitInvalid(...args);
	};
	
	return (
		<Formik
			initialValues={{}}
			onSubmit={onSubmit}
		>
			<Form>
				<ErrorListener onError={onError} />
				{children}
			</Form>
		</Formik>
	);
}

const defaultShouldTriggerErrors = (errors, nextErrors) => !_isEqual(errors, nextErrors);

const ErrorListener = ({ onError, shouldTriggerErrors }) => {
	const shouldTriggerErrorsFunc = shouldTriggerErrors || defaultShouldTriggerErrors;
	const formik = useFormikContext();
	
	const [ errors, updateErrors ] = useState(formik.errors);
	
	useEffect(() => {
		if (!formik.isValid && !formik.isValidating && formik.isSubmitting && shouldTriggerErrorsFunc(errors, formik.errors)) {
			onError(formik.errors);
			// shouldTriggerErrors(errors, formik.errors);
		}
		
		updateErrors(errors);
		// console.log('formik.errors', formik.errors);
		
	}, [formik.errors]);
	
	return null;
};