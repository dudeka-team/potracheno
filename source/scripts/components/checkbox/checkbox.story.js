import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from './index';

storiesOf('Checkbox', module)
	.add('default', () => <Checkbox />)
	.add('indeterminate', () => <Checkbox indeterminate />)
	.add('checked', () => <Checkbox checked />)
	.add('disabled', () => <Checkbox disabled />)
	.add('disabled indeterminate', () => <Checkbox disabled indeterminate />)
	.add('disabled checked', () => <Checkbox disabled checked />);
