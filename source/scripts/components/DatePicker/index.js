import React from 'react';
import shortid from 'shortid';

export default React.createClass({
	componentDidMount() {
		this.inputEl.value = this.props.value;
	},

	componentDidUpdate() {
		this.inputEl.value = this.props.value;
	},

	render() {
		const { props } = this;
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
					ref={(inputEl) => (this.inputEl = inputEl)}
					type="date"
					min={props.min}
					onChange={props.onChange}
					onBlur={props.onBlur}
				/>
			</div>
		);
	},
});
