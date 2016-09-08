import React from 'react';

const EventActionItem = React.createClass({
	render() {
		const icon = this.props.icon;
		const text = this.props.text;
		return (
			<div className="event-action">
				<div className="event-action__icon-wrapper">
					<div className={`event-action__icon event-action__icon_${icon}`} />
				</div>
				<div className="event-action__info">
					<div className="event-action__text">{text}</div>
					<div className="event-action__date">16:05</div>
				</div>
			</div>
		);
	},
});

export default EventActionItem;
