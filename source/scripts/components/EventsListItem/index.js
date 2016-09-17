import React, {PropTypes} from 'react';

function getDate({start, end}) {
	start = new Date(start);
	end = new Date(start);
	return start.getMonth() === end.getMonth() ?
		(start.getDate() === end.getDate() ?
			moment(end).format('DD MMMM')
			:
			`${moment(start).format('DD')} - ${moment(end).format('DD MMMM')}`)
		:
		`${moment(start).format('DD MMMM')} - ${moment(end).format('DD MMMM')}`
}

export default function EventsListItem(props) {
	const debtStatus = 'events-item__debt-status';
	const debtStatusClasses = [debtStatus, `${debtStatus}_${props.debtType}`];

	return (
		<div className="events-item">
			<div className="events-item__leftside">
				<div className="events-item__title">{props.title}</div>
				<div className="events-item__subtitle">
					<div className="events-item__date">{getDate(props.datePeriod)}</div>
					<div className="events-item__members-count">{props.membersCount} участников</div>
				</div>
			</div>
			<div className="events-item__rightside">
				<div className={debtStatusClasses.join(' ')}>
					<div className="events-item__sum">
						{formatSum(props.sum)}
					</div>
				</div>
			</div>
		</div>
	);
}

function formatSum(sum) {
	if (sum === 0) return null;
	return `${sum > 0 ? '+' : '-'}${Math.abs(sum)} Р`;
}

EventsListItem.propTypes = {
	title: PropTypes.string.isRequired,
	datePeriod: PropTypes.object.isRequired,
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
