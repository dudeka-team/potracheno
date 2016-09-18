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

		if (actionType === 'createEvent') {
			return (
				<p className="event-action__text">
					<b className="event-action__text_bold">{manager} </b>
					создал(-а) мероприятие
				</p>
			);
		}

		if (actionType === 'changeEventName') {
			return (
				<p className="event-action__text">
					<b className="event-action__text_bold">{currentUser} </b>
					изменил(-а) название мероприятия на
					<b className="event-action__text_bold"> {eventName} </b>
				</p>
			);
		}

		if (actionType === 'changeEventDate') {
			return (
				<p className="event-action__text">
					<b className="event-action__text_bold">{currentUser} </b>
					изменил(-а) дату проведения мероприятия на
					<b className="event-action__text_bold"> {`${start} - ${end}`} </b>
				</p>
			);
		}

		if (actionType === 'addParticipantToEvent') {
			return (
				<p className="event-action__text">
					<b className="event-action__text_bold">{currentUser} </b>
					добавил(-а) в мероприятие
					<b className="event-action__text_bold"> {participantName} </b>
				</p>
			);
		}

		if (actionType === 'removeParticipantFromEvent') {
			return (
				<p className="event-action__text">
					<b className="event-action__text_bold">{currentUser} </b>
					исключил(-а)
					<b className="event-action__text_bold"> {participantName} </b>
					из мероприятия
				</p>
			);
		}

		if (actionType === 'addPurchase') {
			return (
				<p className="event-action__text">
					<b className="event-action__text_bold">{currentUser} </b>
					добавил(-а) покупку
					<b className="event-action__text_bold"> {purchaseName} </b>
					на сумму
				</p>
			);
		}

		if (actionType === 'deletePurchase') {
			return (
				<p className="event-action__text">
					<b className="event-action__text_bold">{currentUser} </b>
					удалил(-а) покупку
					<b className="event-action__text_bold"> {purchaseName} </b>
				</p>
			);
		}

		if (actionType === 'addParticipantToPurchase') {
			const payer = (payerName === currentUser) ?
				<span className="event-action__text"> себя </span> :
				<span className="event-action__text_bold"> {payerName} </span>;
			return (
				<p className="event-action__text">
					<b className="event-action__text_bold">{currentUser} </b>
					добавил(-а) {payer} в покупку
					<b className="event-action__text_bold"> {purchaseName} </b>
				</p>
			);
		}

		if (actionType === 'removeParticipantFromPurchase') {
			const payer = (payerName === currentUser) ?
				<span className="event-action__text"> себя </span> :
				<span className="event-action__text_bold"> {payerName} </span>;
			return (
				<p className="event-action__text">
					<b className="event-action__text_bold">{currentUser} </b>
					исключил(-а) {payer} из покупки
					<b className="event-action__text_bold"> {purchaseName} </b>
				</p>
			);
		}

		if (actionType === 'giveBackPartially') {
			return (
				<p className="event-action__text">
					<b className="event-action__text_bold">{currentUser} </b>
					отметил(-а) долг
					<b className="event-action__text_bold"> {payerName} </b>
					частично возращенным
				</p>
			);
		}

		if (actionType === 'giveBack') {
			return (
				<p className="event-action__text">
					<b className="event-action__text_bold">{currentUser} </b>
					отметил(-а) долг
					<b className="event-action__text_bold"> {payerName} </b>
					полностью возращенным
				</p>
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
