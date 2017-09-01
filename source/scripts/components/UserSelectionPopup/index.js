import React, { PropTypes } from 'react';
import FormRow from '../form-row';
import FormInput from '../form-input';

import styles from './index.css';

export default function UserSelectionPopup(props) {
	return (
		<FormRow className={styles.root}>
			<FormInput
				placeholder="Ваше имя"
				value={props.name}
				onChange={props.onChangeName}
			/>
		</FormRow>
	);
}

UserSelectionPopup.propTypes = {
	name: PropTypes.string.isRequired,
	onChangeName: PropTypes.func.isRequired,
};
