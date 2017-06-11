import React, {PropTypes} from 'react';
import sumFormat from '../../modules/sumFormat';

function getDate(options) {
	const start = new Date(options.start);
	const end = new Date(options.end);
	let result;

	if (start.getMonth() === end.getMonth()) {
		if (start.getDate() === end.getDate()) {
			result = `${moment(end).format('DD MMMM')}, ${moment(end).format('dddd')}`;
		} else {
			result = `${moment(start).format('DD')} — ${moment(end).format('DD MMMM')}`;
		}
	} else {
		result = `${moment(start).format('DD MMMM')} — ${moment(end).format('DD MMMM')}`;
	}

	return result;
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
						{(props.sum === 0) ? null : `${sumFormat(Math.abs(props.sum))} Р`}
					</div>
					<div className={`events-item__status events-item__status_${props.debtType}`}>
						{formatStatus(props.sum)}
					</div>
				</div>
			</div>
		</div>
	);
}

function formatStatus(sum) {
	if (sum === 0) return null;
	return `${sum > 0 ? 'вам должны' : 'вы должны'}`;
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
