import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './event-header.css';

export default class EventHeader extends PureComponent {
	static propTypes = {
		userSelection: PropTypes.bool,
		name: PropTypes.string.isRequired,
		subtitle: PropTypes.string.isRequired,
	};

	render() {
		const { name, subtitle, userSelection } = this.props;

		return (
			<div
				className={classNames(styles.root, {
					[styles['root_user-selection']]: userSelection,
				})}
			>
				<div className={styles.name}>{name}</div>
				<div className={styles.subtitle}>{subtitle}</div>
			</div>
		);
	}
}
