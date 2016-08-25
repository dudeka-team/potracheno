import React from 'react';
import SquareButton from '../SquareButton';

export default function Popup(props) {
	const {okButton, cancelButton} = props;
	const rootClasses = ['popup'];

	if (!okButton && !cancelButton) {
		rootClasses.push('popup_without-footer');
	}

	return (
		<div className={rootClasses.join(' ')}>
			<div className="popup__overlay" />
			<div className="popup__wrapper">
				<div className="popup__inner">
					<div className="popup__header">
						{props.closeIcon && <div className="popup__icon popup__icon_close" />}
						<div className="popup__title">{props.title}</div>
					</div>
					<div className="popup__content">
						{props.children}
					</div>
					{(okButton || cancelButton) && <PopupFooter
						okButton={okButton}
						cancelButton={cancelButton}
					/>}
				</div>
			</div>
		</div>
	);
}

function PopupFooter(props) {
	const {okButton, cancelButton} = props;

	return (
		<div className="popup__footer">
			{cancelButton && <SquareButton text={cancelButton.text} onClick={cancelButton.onClick} />}
			{okButton && <SquareButton text={okButton.text} onClick={okButton.onClick} />}
		</div>
	);
}
