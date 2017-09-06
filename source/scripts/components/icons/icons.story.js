import React from 'react';
import { storiesOf } from '@storybook/react';
import IconContentCopy from './content-copy';
import IconShoppingCart from './shopping-cart';
import IconCheck from './check';
import IconCross from './cross';

storiesOf('Icons', module)
	.add('ContentCopy', () => <IconContentCopy />)
	.add('ShoppingCart', () => <IconShoppingCart />)
	.add('Check', () => <IconCheck />)
	.add('Cross', () => <IconCross />);
