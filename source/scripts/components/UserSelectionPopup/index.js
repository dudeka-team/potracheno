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
		const {props, state} = this;
		return (
			<div className="user-selection-popup">
				<TextField
					className="new-participant-name"
					type="text"
					underlineFocusStyle={{borderColor: '#ffe151'}}
					style={{width: '100%'}}
					onChange={props.userNameChange}
					errorText={state.isDuplicate && 'Имена участников не должны повторяться'
						|| state.isEmpty && 'Имя не должно быть пустым'}
				/>
			</div>
		);
	},
});

export default UserSelectionPopup;
