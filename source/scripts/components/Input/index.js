import React from 'react';

const Input = React.createClass({
	getInitialState() {
		return {
			focused: false,
			value: this.props.value !== undefined ? this.props.value : '',
		};
	},

	handleChange(event) {
		this.setState({value: event.target.value});
		this.props.onChange(event);
	},

	componentWillReceiveProps(newProps) {
		if (newProps.value) {
			this.setState({value: newProps.value});
		}
	},

	render() {
		const {props, state} = this;
		const classList = ['Input'];
		if (props.size) classList.push(`Input_${props.size}`);
		if (props.marginTopSmall) classList.push('Input_margin-top-small');
		const labelClassList = ['floating-label'];
		if ((state.focused || state.value.length) && !props.labelFixed) {
			labelClassList.push('floating-label_transformed');
		}
		if (props.labelSize) labelClassList.push(`floating-label_${props.labelSize}`);
		if (props.labelFixed) labelClassList.push('floating-label_fixed');
		return (
			<div className={classList.join(' ')}>
				{props.label &&
					<div className={labelClassList.join(' ')}>{props.label}</div>
				}
				<input
					className="input"
					type={props.type ? props.type : 'text'}
					value={this.state.value}
					onChange={this.handleChange}
					onFocus={() => this.setState({focused: true})}
					onBlur={() => this.setState({focused: false})}
					disabled={props.disabled}
					placeholder={props.hint}
				/>
			</div>
		);
	},


});


export default Input;
