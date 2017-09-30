import React, { PropTypes, PureComponent } from 'react';
import PageHeader from './page-header';
import PageFooter from './page-footer';
import PageContent from './page-content';
import styles from './page.css';

export default class Page extends PureComponent {
	static propTypes = {
		children: PropTypes.node,
	};

	static Header = PageHeader;
	static Footer = PageFooter;
	static Content = PageContent;

	render() {
		const { children, ...restProps } = this.props;

		return (
			<div className={styles.root} {...restProps}>
				{children}
			</div>
		);
	}
}
