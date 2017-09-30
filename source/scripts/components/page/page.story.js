import React from 'react';
import { storiesOf } from '@storybook/react';
import { Page, PageContent } from './';

storiesOf('Page', module)
	.add('default', () => (
		<Page>
			topbar

			<PageContent>
				PageContent
			</PageContent>
		</Page>
	));
