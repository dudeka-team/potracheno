import React from 'react';
import shortid from 'shortid';

export default function Datepicker(props) {
	const id = shortid.generate();

	return (
		<div className="datepicker">
			<label
				htmlFor={id}
				className="datepicker__label"
			>{props.label}</label>
			<input
				id={id}
				className="datepicker__input"
				type="date"
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
			/>
		</div>
	);
}
