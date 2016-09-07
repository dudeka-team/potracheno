import React from 'react';

const EventActionItem = React.createClass({
	render() {
		return (
			<div className="event-action">
				<div className="event-action__icon-wrapper">
					<div className="event-action__icon" />
				</div>
				<div className="event-action__info">
					<div className="event-action__text">Дима добавил(-а) в мероприятие Игорь</div>
					<div className="event-action__date">16:05</div>
				</div>
			</div>
		);
	},
});

export default EventActionItem;
