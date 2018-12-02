import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './page.css';

export default class PageFooter extends PureComponent {
	static propTypes = {
		children: PropTypes.node,
	};

	render() {
		const { children, ...restProps } = this.props;

		return (
			<footer className={styles.footer} {...restProps}>
				{children}
			</footer>
		);
	}
}
