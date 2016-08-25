import React from 'react';

export default class Input extends React.Component {
	constructor(props) {
		super();
		this.init(props);
		this.state = {
			focused: false,
			empty: true,
			value: this.hint
		};
	}

	init(props) {
		if (props.label !== undefined) {
			this.labelExists = true;
		}
		this.style = props.style;
		this.hint = props.hint ? props.hint : '';
		this.labelText = props.label;
		this.labelStyle = props.labelStyle;
		this.labelTransform = props.labelTransform;
		this.labelTransformedStyle = {};
		for (var prop in this.labelStyle) {
			this.labelTransformedStyle[prop] = this.labelStyle[prop];
		}
		for (var prop in this.labelTransform) {
			this.labelTransformedStyle[prop] = this.labelTransform[prop];
		}
		console.log(this.labelTransformedStyle);
	}

	handleFocus() {
		if (this.state.empty) {
			this.setState({
				focused: true,
				empty: false,
				value: ''
			});
		}
	}

	handleUnfocus() {
		if (this.state.value === '') {
			this.setState({
				focused: false,
				empty: true,
				value: this.hint
			});
		}
	}

	render() {
		var classList = ['input'];
		if (this.state.empty) {
			classList.push('input_empty');
		}
		return (
			<div className='Input' style={this.style}>
				{
					this.labelExists ?
						<div
							className='floating-text'
							style={this.state.focused ? this.labelTransformedStyle : this.labelStyle}
						>{this.labelText}</div> : ''
				}
				<input
					className={classList.join(' ')}
					type='text'
					value={this.state.value}
					onChange={this.handleChange.bind(this)}
					onFocus={this.handleFocus.bind(this)}
					onBlur={this.handleUnfocus.bind(this)}
				/>
			</div>
		);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}
}