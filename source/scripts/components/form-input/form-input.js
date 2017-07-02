import React, { PropTypes } from 'react';
import styles from './form-input.css';

export default function FormInput(props) {
	const {
		id,
		type,
		size,
		disabled,
		placeholder,
		value,
		onChange,
	} = props;

	return (
		<input
			className={`${styles.root} ${styles[`root_size_${size}`]}`}
			id={id}
			type={type}
			disabled={disabled}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
}

FormInput.sizes = {
	normal: 'normal',
	large: 'large',
};

FormInput.propTypes = {
	id: PropTypes.string.isRequired,
	type: PropTypes.string,
	size: PropTypes.oneOf(Object.values(FormInput.sizes)),
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onChange: PropTypes.func.isRequired,
};

FormInput.defaultProps = {
	type: 'text',
	size: FormInput.sizes.normal,
};
