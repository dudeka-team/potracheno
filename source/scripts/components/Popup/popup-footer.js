import React from 'react';
import classNames from 'classnames';
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
			{cancelButton ?
				<button className={styles.button} onClick={cancelButton.onClick}>
					{cancelButton.text}
				</button>
				:
				null
			}

			{okButton ?
				<button className={styles.button} onClick={okButton.onClick}>
					{okButton.text}
				</button>
				:
				null
			}
		</div>
	);
}
