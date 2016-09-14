import React from 'react';
import Hammer from 'react-hammerjs';

import {DRAWER_SWIPE_AREA_WIDTH} from '../../constants';

const Tabs = React.createClass({
	getInitialState() {
		const {defaultTabIndex, config} = this.props;
		let activeTabIndex = 0;

		if (
			typeof defaultTabIndex === 'number' &&
			defaultTabIndex >= 0 &&
			defaultTabIndex <= config.length
		) {
			activeTabIndex = defaultTabIndex;
		}

		return {
			activeTabIndex,
		};
	},

	handleTabChange(event) {
		const {target} = event;
		const targetTabIndex = parseInt(target.getAttribute('data-tab'), 10);

		if (typeof targetTabIndex === 'number') {
			this.setState({
				activeTabIndex: targetTabIndex,
			});
		}
	},

	handleSwipe(event) {
		const swipeStartX = event.center.x - event.deltaX;
		if ((window.innerWidth - swipeStartX) < DRAWER_SWIPE_AREA_WIDTH) return;

		const {activeTabIndex} = this.state;
		const {config} = this.props;
		let newActiveTabIndex = activeTabIndex;

		if (event.direction === 4 && activeTabIndex > 0) {
			newActiveTabIndex = activeTabIndex - 1;
		}

		if (event.direction === 2 && activeTabIndex < config.length - 1) {
			newActiveTabIndex = activeTabIndex + 1;
		}

		this.setState({
			activeTabIndex: newActiveTabIndex,
		});
	},

	computeTabsTransform() {
		const {activeTabIndex} = this.state;
		return {
			transform: `translateX(-${100 * activeTabIndex}%)`,
		};
	},

	render() {
		const {config} = this.props;
		const {activeTabIndex} = this.state;

		return (
			<div className="tabs">
				<div className="tabs__nav" onClick={this.handleTabChange}>
					{config.map((item, index) => (
						<TabsItem
							key={index}
							isActive={activeTabIndex === index}
							index={index}
							className="tabs__link"
						>
							{item.labelContent}
						</TabsItem>
					))}
				</div>
				<div className="tabs__content" style={this.computeTabsTransform()}>
					{config.map((item, index) => (
						<Hammer onSwipe={this.handleSwipe} key={index}>
							<TabsItem
								isActive={activeTabIndex === index}
								index={index}
								className="tabs__item"
							>
								{item.content}
							</TabsItem>
						</Hammer>
					))}
				</div>
			</div>
		);
	},
});

function TabsItem(props) {
	let classes = props.className || '';

	if (props.isActive) {
		classes += ' is-active';
	}

	return (
		<div className={classes.trim()} data-tab={props.index}>{props.children}</div>
	);
}

export default Tabs;

// Example usage
// <Tabs
// 	config={[
// 		{
// 			labelContent: 'Покупки',
// 			content: <Purchases />,
// 		},
// 		{
// 			labelContent: 'Баланс',
// 			content: <Balance />,
// 		},
// 		{
// 			labelContent: 'Действия',
// 			content: <EventActions />,
// 		},
// 	]}
// />
