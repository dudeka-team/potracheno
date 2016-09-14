import React, {PropTypes} from 'react';

export default function EventsListItem(props) {
	const debtStatus = 'events-item__debt-status';
	const debtStatusClasses = [debtStatus, `${debtStatus}_${props.debtType}`];

	return (
		<div className="events-item">
			<div className="events-item__leftside">
				<div className="events-item__title">{props.title}</div>
				<div className="events-item__subtitle">
					<div className="events-item__date">{moment(props.date).format('DD MMMM')}</div>
					<div className="events-item__members-count">{props.membersCount} участников</div>
				</div>
			</div>
			<div className="events-item__rightside">
				<div className={debtStatusClasses.join(' ')}>
					<div className="events-item__sum">
						{
							(props.sum !== 0)
								&& (
										(props.sum > 0)
											?
											`+${props.sum} Р`
											:
											`${props.sum} Р`
									)
						}
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
