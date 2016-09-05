import React from 'react';

export function Page(props) {
	return (
		<div className="page">
			{props.children}
		</div>
	);
}

export function PageContent(props) {
	return (
		<div className="page__content">
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
