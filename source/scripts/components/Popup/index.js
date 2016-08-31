import React, {PropTypes} from 'react';
import SquareButton from '../SquareButton';

const Popup = React.createClass({
	propTypes: {
		title: PropTypes.string.isRequired,
		closeIcon: PropTypes.bool,
		okButton: PropTypes.shape({
			text: PropTypes.string.isRequired,
			onClick: PropTypes.func,
		}),
		cancelButton: PropTypes.shape({
			text: PropTypes.string.isRequired,
			onClick: PropTypes.func,
		}),
		onClose: PropTypes.func,
	},

	render() {
		const {props} = this;
		const {okButton, cancelButton} = props;
		const rootClasses = ['popup'];

		if (!okButton && !cancelButton) {
			rootClasses.push('popup_without-footer');
		}

		return (
			<div className={rootClasses.join(' ')}>
				<div className="popup__overlay" onClick={props.onClose} />
				<div className="popup__wrapper">
					<div className="popup__inner">
						<div className="popup__header">
							{props.closeIcon && <div
								className="popup__icon popup__icon_close"
								onClick={props.onClose}
							/>}
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
	},
});

function PopupFooter(props) {
	const {okButton, cancelButton} = props;

	return (
		<div className="popup__footer">
			{cancelButton && <SquareButton text={cancelButton.text} onClick={cancelButton.onClick} />}
			{okButton && <SquareButton text={okButton.text} onClick={okButton.onClick} />}
		</div>
	);
}

export default Popup;

// Example usage
// <Popup
// 	title="Шашлык"
// 	closeIcon
// 	okButton={{
// 		text: 'Добавить',
// 		onClick: () => {},
// 	}}
// 	cancelButton={{
// 		text: 'Отменить',
// 		onClick: () => {},
// 	}}
// >
// 	<div>Popup content</div>
// </Popup>
