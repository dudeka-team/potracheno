import React, {PropTypes} from 'react';

export default function EventsListItem(props) {
	const debtStatus = 'events-item__debt-status';
	const debtStatusClasses = [debtStatus, `${debtStatus}_${props.debtType}`];

	return (
		<div className="events-item">
			<div className="events-item__leftside">
				<div className="events-item__title">{props.title}</div>
				<div className="events-item__subtitle">
					<span className="events-item__membersCount">{props.membersCount} участников</span>
					<span>{moment(props.date).format('DD MMMM')}</span>
				</div>
			</div>
			<div className="events-item__rightside">
				<div className={debtStatusClasses.join(' ')}>
					<div className="events-item__sum">{props.sum} Р</div>
					<div className="events-item__debtType">
						{props.debtType === 'positive' && 'вам должны'}
						{props.debtType === 'negative' && 'вы должны'}
						{props.debtType === 'neutural' && 'нет долгов'}
					</div>
				</div>
			</div>
		</div>
	);
}

EventsListItem.propTypes = {
	title: PropTypes.string.isRequired,
	date: PropTypes.number.isRequired,
	debtType: PropTypes.oneOf(['positive', 'negative', 'neutural']).isRequired,
	membersCount: PropTypes.number.isRequired,
	sum: PropTypes.number.isRequired,
};

// Usage example
// <EventListItem
// 		title="Дача у Дамира"
// 		membersNumber={5}
// 		date={new Date()}
// 		sum={5490}
// 		debtType="positive"
// />
