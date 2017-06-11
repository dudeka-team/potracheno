import React from 'react';
import TextField from 'material-ui/TextField';

const UserSelectionPopup = React.createClass({
	getInitialState() {
		return {
			isDuplicate: false,
			isEmpty: false,
		};
	},

	render() {
		const { props, state } = this;
		let errorText;

		if (state.isDuplicate) {
			errorText = 'Имена участников не должны повторяться';
		} else if (state.isEmpty) {
			errorText = 'Имя не должно быть пустым';
		}

		return (
			<div className="user-selection-popup">
				<TextField
					className="new-participant-name"
					type="text"
					underlineFocusStyle={{ borderColor: '#ffe151' }}
					style={{ width: '100%' }}
					onChange={props.userNameChange}
					errorText={errorText}
				/>
			</div>
		);
	},
});

export default UserSelectionPopup;
