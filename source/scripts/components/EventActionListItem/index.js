import React from 'react';

const EventActionItem = React.createClass({
	renderAction(actionType) {
		const {props} = this;
		const {
			purchaseName,
			currentUser,
			participantName,
			payerName,
			eventName,
			start,
			end,
			manager,
		} = props;
		const regularText = 'event-action__text';
		const boldText = 'event-action__text event-action__text_bold';

		if (actionType === 'createEvent') {
			return (
				<div>
					<span className={boldText}>{manager} </span>
					<span className={regularText}>создал мероприятие</span>
				</div>
			);
		}

		if (actionType === 'changeEventName') {
			return (
				<div>
					<span className={boldText}>{currentUser} </span>
					<span className={regularText}>изменил(-а) название мероприятия на</span>
					<span className={boldText}> {eventName}</span>
				</div>
			);
		}

		if (actionType === 'changeEventDate') {
			return (
				<div>
					<span className={boldText}>{currentUser} </span>
					<span className={regularText}>изменил(-а) время мероприятия на</span>
					<span className={boldText}> {`${start} - ${end}`}</span>
				</div>
			);
		}

		if (actionType === 'addParticipantToEvent') {
			return (
				<div>
					<span className={boldText}>{currentUser} </span>
					<span className={regularText}>добавил(-а) в мероприятие</span>
					<span className={boldText}> {participantName}</span>
				</div>
			);
		}

		if (actionType === 'removeParticipantFromEvent') {
			return (
				<div>
					<span className={boldText}>{currentUser} </span>
					<span className={regularText}>исключил(-а)</span>
					<span className={boldText}> {participantName}</span>
					<span className={regularText}> из мероприятия</span>
				</div>
			);
		}

		if (actionType === 'addPurchase') {
			return (
				<div>
					<span className={boldText}>{currentUser} </span>
					<span className={regularText}>добавил(-а) покупку на сумму</span>
				</div>
			);
		}

		if (actionType === 'deletePurchase') {
			return (
				<div>
					<span className={boldText}>{currentUser} </span>
					<span className={regularText}>удалил(-а) покупку</span>
					<span className={boldText}> {purchaseName}</span>
				</div>
			);
		}

		if (actionType === 'addParticipantToPurchase') {
			const payer = (payerName === currentUser) ?
				<span className={regularText}> себя </span> :
				<span className={boldText}> {payerName} </span>;
			return (
				<div>
					<span className={boldText}>{currentUser} </span>
					<span className={regularText}>добавил(-а)</span>
					{payer}
					<span className={regularText}>в покупку</span>
					<span className={boldText}> {purchaseName}</span>
				</div>
			);
		}

		if (actionType === 'removeParticipantFromPurchase') {
			const payer = (payerName === currentUser) ?
				<span className={regularText}> себя </span> :
				<span className={boldText}> {payerName} </span>;
			return (
				<div>
					<span className={boldText}>{currentUser} </span>
					<span className={regularText}>удалил(-а)</span>
					{payer}
					<span className={regularText}>из покупки</span>
					<span className={boldText}> {purchaseName}</span>
				</div>
			);
		}

		if (actionType === 'giveBackPartially') {
			return (
				<div>
					<span className={boldText}>{currentUser} </span>
					<span className={regularText}>отметил долг</span>
					<span className={boldText}> {payerName} </span>
					<span className={regularText}>частично возвращенным</span>
				</div>
			);
		}

		if (actionType === 'giveBack') {
			return (
				<div>
					<span className={boldText}>{currentUser} </span>
					<span className={regularText}>отметил долг</span>
					<span className={boldText}> {payerName} </span>
					<span className={regularText}>возвращенным</span>
				</div>
			);
		}
	},
	render() {
		const {props} = this;
		const {icon, date, sum, debtSum, actionType} = props;


		return (
			<div className="event-action">
			{/* eslint-disable max-len */}
				<div className={`event-action__icon-wrapper ${(icon === 'check-active-yellow') && 'event-action__icon-wrapper_yellow'}`}>
					<div className={`event-action__icon event-action__icon_${icon}`} />
				</div>
				<div className="event-action__info">
					<div className="event-action__content">
						<div className="event-action__text-wrapper">
							{this.renderAction(actionType)}
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
