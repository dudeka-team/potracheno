import React from 'react';

const Input = React.createClass({
	getInitialState() {
		this.init(this.props);
		return {
			focused: false,
			value: '',
		};
	},
	
	init(props) {
		if (props.label !== undefined) {
			this.labelExists = true;
		}
		this.style = props.style;
		this.hint = props.hint ? props.hint : '';
		this.labelText = props.label;
		this.labelStyle = props.labelStyle;
		this.labelTransform = props.labelTransform;
		this.labelTransformedStyle = Object.assign({}, this.labelStyle);
		Object.assign(this.labelTransformedStyle, this.labelTransform);
	},

	handleFocus() {
		this.setState({
			focused: true,
		});
	},

	handleUnfocus() {
		if (this.state.value === '') {
			this.setState({
				focused: false,
			});
		}
	},

	handleChange(event) {
		this.setState({value: event.target.value});
		this.props.onChange(event);
	},

	render() {
		const {props} = this;
		const classList = ['input'];
		if (this.state.empty) {
			classList.push('input_empty');
		}
		return (
			<div className="Input" style={this.style}>
				{this.labelExists &&
					<div
						className="floating-text"
						style={this.state.focused ? this.labelTransformedStyle : this.labelStyle}
					>{this.labelText}</div>
				}
				<input
					className={classList.join(' ')}
					type={props.type ? props.type : 'text'}
					value={this.state.value}
					onChange={this.handleChange}
					onFocus={this.handleFocus}
					onBlur={this.handleUnfocus}
					disabled={props.disabled ? true : false}
					placeholder={this.hint}
				/>
			</div>
		);
	},


});


export default Input;
