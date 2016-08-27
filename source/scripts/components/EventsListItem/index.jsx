import React, {PropTypes} from 'react';

export default function EventsListItem(props) {
	const sumClass = "events-item__sum";

	return (
		<li className="events-item">
			<div className="events-item__leftside">
				<div className="events-item__title">{props.title}</div>
				<div className="events-item__subtitle">
					<span className="events-item__membersNumber">{props.membersNumber} учасников</span>
					<span>{props.date}</span>
				</div>
			</div>
			<div className="events-item__rightside">
				<div className={[sumClass, `${sumClass}_${props.debtType}`].join(' ')}>{props.sum} Р</div>
				{props.debtType === "positive" && <div className="events-item__debtType events-item__debtType_positive">вам должны</div>}
				{props.debtType === "negative" && <div className="events-item__debtType events-item__debtType_negative">вы должны</div>}
			</div>
		</li>
	);
};

EventsListItem.propTypes = {
	title: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	debtType: PropTypes.string.isRequired,
	membersNumber: PropTypes.number.isRequired,
	sum: PropTypes.number.isRequired,
};

// Usage example
// <EventListItem title="Дача у Дамира" membersNumber={5} date="12 апреля" sum={5490} debtType="positive" />
