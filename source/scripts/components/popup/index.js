import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PopupFooter from './popup-footer';
import styles from './popup.css';

export default class Popup extends PureComponent {
	static propTypes = {
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
	};

	render() {
		const { props } = this;
		const { okButton, cancelButton, unBordered, largeHeader } = props;

		return (
			<div
				className={classNames(styles.root, {
					[styles['root_without-footer']]: !okButton && !cancelButton,
				})}
			>
				<div className={styles.overlay} onClick={props.onClose} />
				<div className={styles.wrapper}>
					<div className={styles.inner}>
						<div
							className={classNames(styles.header, {
								[styles.header_large]: largeHeader,
								[styles.header_unbordered]: unBordered,
							})}
						>
							{props.closeIcon && (
								<div
									className={classNames(styles.icon, styles.icon_close)}
									onClick={props.onClose}
								/>
							)}

							<div
								className={classNames(styles.title, {
									[styles.title_large]: largeHeader,
								})}
							>
								{props.title}
							</div>
						</div>

						<div
							className={classNames(styles.content, {
								[styles.content_unbordered]: unBordered,
							})}
						>
							{props.children}
						</div>

						<PopupFooter
							okButton={okButton}
							cancelButton={cancelButton}
							unBordered={unBordered}
						/>
					</div>
				</div>
			</div>
		);
	}
}
