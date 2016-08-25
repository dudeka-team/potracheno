import React from 'react';


const Tabs = React.createClass({
	getInitialState() {
		return {
			activeTab: null,
		};
	},

	handleTabChange(event) {
		const {target} = event;
		const targetTab = target.getAttribute('data-tab');

		if (targetTab) {
			this.setState({
				activeTab: targetTab,
			});
		}
	},

	render() {
		const {state, props} = this;
		const {config} = this.props;
		const activeTabName = state.activeTab || props.defaultTab || config[0].name;

		return (
			<div className="tabs">
				<div className="tabs__nav" onClick={this.handleTabChange}>
					{config.map((item) => (
						<TabsItem
							key={item.name}
							isActive={activeTabName === item.name}
							name={item.name}
							className="tabs__link"
						>
							{item.labelContent}
						</TabsItem>
					))}
				</div>
				<div className="tabs__content">
					{config.map((item) => (
						<TabsItem
							key={item.name}
							isActive={activeTabName === item.name}
							name={item.name}
							className="tabs__item"
						>
							{item.content}
						</TabsItem>
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
		<div className={classes.trim()} data-tab={props.name}>{props.children}</div>
	);
}

export default Tabs;
