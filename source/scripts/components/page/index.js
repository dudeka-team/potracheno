import React from 'react';
import styles from './page.css';

export function Page(props) {
	return (
		<div className={styles.root} {...props}>
			{props.children}
		</div>
	);
}

export function PageContent(props) {
	return (
		<div className={styles.content} {...props}>
			{props.children}
		</div>
	);
}

// Example usage
// <Page>
// 	<TopBar>
// 		top bar is fixed
// 	</TopBar>
// 	<PageContent>
// 		page content is scrollable
// 	</PageContent>
// </Page>
