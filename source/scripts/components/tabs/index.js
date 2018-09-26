import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Hammer from 'react-hammerjs';
import { DRAWER_SWIPE_AREA_WIDTH } from '../../constants';
import styles from './tabs.css';

export default class Tabs extends PureComponent {
	static propTypes = {
		config: PropTypes.arrayOf(PropTypes.shape({
			labelContent: PropTypes.string.isRequired,
			content: PropTypes.node.isRequired,
		})).isRequired,
	};

	constructor(props) {
		super(props);

		const { defaultTabIndex, config } = props;
		let activeTabIndex = 0;

		if (
			typeof defaultTabIndex === 'number' &&
			defaultTabIndex >= 0 &&
			defaultTabIndex <= config.length
		) {
			activeTabIndex = defaultTabIndex;
		}

		this.state = {
			activeTabIndex,
		};
	}

	computeTabsTransform = () => {
		const { activeTabIndex } = this.state;
		const transform = `translateX(-${100 * activeTabIndex}%)`;
		return {
			transform,
			webkitTransform: transform,
			mozTransform: transform,
			msTransform: transform,
		};
	};

	handleTabChange = (event) => {
		const { target } = event;
		const targetTabIndex = parseInt(target.getAttribute('data-tab'), 10);

		if (typeof targetTabIndex === 'number') {
			this.setState({
				activeTabIndex: targetTabIndex,
			});
		}
	};

	handleSwipe = (event) => {
		const swipeStartX = event.center.x - event.deltaX;
		if ((window.innerWidth - swipeStartX) < DRAWER_SWIPE_AREA_WIDTH) return;

		const { activeTabIndex } = this.state;
		const { config } = this.props;
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
	};

	render() {
		const { config } = this.props;
		const { activeTabIndex } = this.state;

		return (
			<div className={styles.root}>
				<div className={styles.nav} onClick={this.handleTabChange}>
					{config.map((item, index) => (
						<div
							key={index}
							data-tab={index}
							className={classNames(styles.link, {
								[styles.link_active]: activeTabIndex === index,
							})}
						>
							{item.labelContent}
						</div>
					))}
				</div>
				<div className={styles.content} style={this.computeTabsTransform()}>
					{config.map((item, index) => (
						<Hammer onSwipe={this.handleSwipe} key={index}>
							<div
								data-tab={index}
								className={styles.item}
							>
								{item.content}
							</div>
						</Hammer>
					))}
				</div>
			</div>
		);
	}
}
