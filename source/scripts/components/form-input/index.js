import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './form-input.css';

export default function FormInput(props) {
	const {
		id,
		type,
		size,
		disabled,
		invalid,
		placeholder,
		value,
		onChange,
		...restProps
	} = props;

	return (
		<input
			className={classNames(styles.root, styles[`root_size_${size}`], {
				[styles.root_disabled]: disabled,
				[styles.root_invalid]: invalid,
			})}
			id={id}
			type={type}
			disabled={disabled}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			{...restProps}
		/>
	);
}

FormInput.sizes = {
	normal: 'normal',
	large: 'large',
};

FormInput.propTypes = {
	id: PropTypes.string,
	type: PropTypes.string,
	size: PropTypes.oneOf(Object.values(FormInput.sizes)),
	disabled: PropTypes.bool,
	invalid: PropTypes.bool,
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onChange: PropTypes.func.isRequired,
};

FormInput.defaultProps = {
	type: 'text',
	size: FormInput.sizes.normal,
};
