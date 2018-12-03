import React from 'react';
import dayjs from 'dayjs';

class EventActionListItem extends React.Component {
	renderAction = actionType => {
		const { props } = this;
		const {
			purchaseName,
			currentUser,
			participantName,
			payerName,
			eventName,
			start,
			end,
			manager,
			purchaseParticipantsNumber,
			eventParticipantsNumber,
		} = props;

		switch (actionType) {
			case 'createEvent': {
				return (
					<p className="event-action__text">
						<b className="event-action__text_bold">{manager} </b>
						создал(-а) мероприятие
					</p>
				);
			}

			case 'changeEventName': {
				return (
					<p className="event-action__text">
						<b className="event-action__text_bold">{currentUser} </b>
						изменил(-а) название мероприятия на
						<b className="event-action__text_bold"> {eventName} </b>
					</p>
				);
			}

			case 'changeEventDate': {
				return (
					<p className="event-action__text">
						<b className="event-action__text_bold">{currentUser} </b>
						изменил(-а) дату проведения мероприятия на
						<b className="event-action__text_bold"> {`${start} - ${end}`} </b>
					</p>
				);
			}

			case 'addParticipantToEvent': {
				return (
					<p className="event-action__text">
						<b className="event-action__text_bold">{currentUser} </b>
						добавил(-а) в мероприятие
						<b className="event-action__text_bold"> {participantName} </b>
					</p>
				);
			}

			case 'addParticipantsToEvent': {
				return (
					<p className="event-action__text">
						<b className="event-action__text_bold">{manager} </b>
						добавил(-а)
						<b className="event-action__text_bold">
							{' '}
							{eventParticipantsNumber}{' '}
						</b>
						человек в мероприятие
					</p>
				);
			}

			case 'removeParticipantFromEvent': {
				return (
					<p className="event-action__text">
						<b className="event-action__text_bold">{currentUser} </b>
						исключил(-а)
						<b className="event-action__text_bold"> {participantName} </b>
						из мероприятия
					</p>
				);
			}

			case 'addPurchase': {
				return (
					<p className="event-action__text">
						<b className="event-action__text_bold">{currentUser} </b>
						добавил(-а) покупку
						<b className="event-action__text_bold"> {purchaseName} </b>
						на сумму
					</p>
				);
			}

			case 'deletePurchase': {
				return (
					<p className="event-action__text">
						<b className="event-action__text_bold">{currentUser} </b>
						удалил(-а) покупку
						<b className="event-action__text_bold"> {purchaseName} </b>
					</p>
				);
			}

			case 'addParticipantsToPurchase': {
				return (
					<p className="event-action__text">
						<b className="event-action__text_bold">{currentUser} </b>
						добавил(-а)
						<b className="event-action__text_bold">
							{' '}
							{purchaseParticipantsNumber}{' '}
						</b>
						человек в покупку
						<b className="event-action__text_bold"> {purchaseName}</b>
					</p>
				);
			}

			case 'addParticipantToPurchase': {
				const payer =
					payerName === currentUser ? (
						<span className="event-action__text">себя</span>
					) : (
						<span className="event-action__text_bold">{payerName}</span>
					);

				return (
					<p className="event-action__text">
						<b className="event-action__text_bold">{currentUser}</b> добавил(-а){' '}
						{payer} в покупку{' '}
						<b className="event-action__text_bold">{purchaseName}</b>
					</p>
				);
			}

			case 'removeParticipantFromPurchase': {
				const payer =
					payerName === currentUser ? (
						<span className="event-action__text">себя</span>
					) : (
						<span className="event-action__text_bold">{payerName}</span>
					);

				return (
					<p className="event-action__text">
						<b className="event-action__text_bold">{currentUser}</b>{' '}
						исключил(-а) {payer} из покупки{' '}
						<b className="event-action__text_bold">{purchaseName}</b>
					</p>
				);
			}

			case 'giveBackPartially': {
				return (
					<p className="event-action__text">
						<b className="event-action__text_bold">{currentUser}</b> отметил(-а)
						долг <b className="event-action__text_bold">{payerName}</b> частично
						возращенным
					</p>
				);
			}

			case 'giveBack': {
				return (
					<p className="event-action__text">
						<b className="event-action__text_bold">{currentUser}</b> отметил(-а)
						долг <b className="event-action__text_bold">{payerName}</b>{' '}
						полностью возращенным
					</p>
				);
			}

			default: {
				return null;
			}
		}
	};

	render() {
		const { props } = this;
		const { icon, date, sum, debtSum, actionType } = props;

		return (
			<div className="event-action">
				<div
					className={`event-action__icon-wrapper ${icon ===
						'check-active-yellow' && 'event-action__icon-wrapper_yellow'}`}
				>
					<div className={`event-action__icon event-action__icon_${icon}`} />
				</div>
				<div className="event-action__info">
					<div className="event-action__content">
						<div className="event-action__text-wrapper">
							{this.renderAction(actionType)}
						</div>
						{sum && <div className="event-action__sum">{sum} Р</div>}
						{debtSum && (
							<div className="event-action__debt-sum">
								<div className="event-action__debt-icon" />
								{debtSum} Р
							</div>
						)}
					</div>
					{date && (
						<div className="event-action__date">{dayjs(date).fromNow()}</div>
					)}
				</div>
			</div>
		);
	}
}

export default EventActionListItem;
