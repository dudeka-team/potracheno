import React from 'react';

const EventActionItem = React.createClass({
	render() {
		const icon = this.props.icon;
		const text = this.props.text;
		const date = this.props.date;
		return (
			<div className="event-action">
				<div className="event-action__icon-wrapper">
					<div className={`event-action__icon event-action__icon_${icon}`} />
				</div>
				<div className="event-action__info">
					<div className="event-action__content">
						{
							text.split(' ').map((item) => {
								if (item.includes('_b')) {
									return <span className='event-action__text event-action__text_bold'>{`${item.slice(2)} `}</span>
								} else {
									return <span className='event-action__text'>{`${item} `}</span>
								}
							})
						}		
					</div>
					{date && <div className="event-action__date">{date}</div>}
				</div>
			</div>
		);
	},
});

export default EventActionItem;
