import React, { PropTypes } from 'react';

export default function FlexContainer(props) {
	const baseClass = 'flex';
	const classes = [baseClass];
	const { alignItems, justifyContent, flexDirection, fullHeight } = props;

	if (fullHeight) {
		classes.push('flex_full-height');
	}

	if (alignItems) {
		classes.push(`flex_ai-${alignItems}`);
	}

	if (justifyContent) {
		classes.push(`flex_jc-${justifyContent}`);
	}

	if (flexDirection) {
		classes.push(`flex_fd-${flexDirection}`);
	}

	return (
		<div className={classes.join(' ')}>
			{props.children}
		</div>
	);
}

FlexContainer.propTypes = {
	alignItems: PropTypes.string,
	justifyContent: PropTypes.string,
	flexDirection: PropTypes.string,
};

// Usage example
// <FlexContainer alignItems='center' justifyContent='center'
// flexDirection='row-reverse' fullHeight>
//	 <div>center</div>
// </FlexContainer>
