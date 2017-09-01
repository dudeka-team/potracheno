import React from 'react';
import classNames from 'classnames';
import FlatButton from 'material-ui/FlatButton';
import styles from './popup.css';

export default function PopupFooter(props) {
	const { okButton, cancelButton, unBordered } = props;

	if (!okButton && !cancelButton) {
		return null;
	}

	return (
		<div
			className={classNames(styles.footer, {
				[styles.footer_unbordered]: unBordered,
			})}
		>
			{cancelButton && <FlatButton label={cancelButton.text} onTouchTap={cancelButton.onClick} />}
			{okButton && <FlatButton label={okButton.text} onTouchTap={okButton.onClick} />}
		</div>
	);
}
