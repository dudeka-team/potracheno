import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './spinner.css';

export default class Spinner extends PureComponent {
	static propTypes = {
		className: PropTypes.string,
	};

	static defaultProps = {
		className: '',
	};

	render() {
		const { className } = this.props;

		return (
			<div className={classNames(styles.root, className)}>Загрузка...</div>
		);
	}
}
