import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './page.css';

export default class PageContent extends PureComponent {
	static propTypes = {
		children: PropTypes.node,
	};

	render() {
		const { children, ...restProps } = this.props;

		return (
			<main className={styles.content} {...restProps}>
				{children}
			</main>
		);
	}
}
