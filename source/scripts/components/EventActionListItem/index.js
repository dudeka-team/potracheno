import React from 'react';

const EventActionItem = React.createClass({
	render() {
		const {props} = this;
		const icon = props.icon;
		const text = props.text;
		const date = props.date;
		const sum = props.sum;
		const debtSum = props.debtSum;

		return (
			<div className="event-action">
			{/* eslint-disable max-len */}
				<div className={`event-action__icon-wrapper ${(icon === 'check-active-yellow') && 'event-action__icon-wrapper_yellow'}`}>
					<div className={`event-action__icon event-action__icon_${icon}`} />
				</div>
				<div className="event-action__info">
					<div className="event-action__content">
						<div className="event-action__text-wrapper">
							{
								text.split('_s_').map((item, i) => {
									if (item.includes('b_')) {
										return (
											<span key={i} className="event-action__text event-action__text_bold">
												{`${item.slice(2)} `}
											</span>
										);
									}

									return (
										<span key={i} className="event-action__text">{`${item} `}</span>
									);
								})
							}
						</div>
						{sum && <div className="event-action__sum">{sum} Р</div>}
						{debtSum &&
							<div className="event-action__debt-sum">
								<div className="event-action__debt-icon" />
								{debtSum} Р
							</div>
						}
					</div>
					{date && <div className="event-action__date">{moment(date).fromNow()}</div>}
				</div>
			</div>
		);
	},
});

export default EventActionItem;
