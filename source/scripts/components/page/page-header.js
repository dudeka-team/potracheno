import React, { PropTypes, PureComponent } from 'react';
import styles from './page.css';

export default class PageHeader extends PureComponent {
	static propTypes = {
		children: PropTypes.node,
	};

	render() {
		const { children, ...restProps } = this.props;

		return (
			<header className={styles.header} {...restProps}>
				{children}
			</header>
		);
	}
}
