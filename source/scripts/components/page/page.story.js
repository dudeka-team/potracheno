import React from 'react';
import { storiesOf } from '@storybook/react';
import Page from './';

storiesOf('Page', module).add('default', () => (
	<Page>
		<Page.Header>page header</Page.Header>

		<Page.Content>page content</Page.Content>

		<Page.Footer>page footer</Page.Footer>
	</Page>
));
