
export function getEventBalance(currentEvent) {
	const purchases = Object
			.keys((currentEvent && currentEvent.purchases) || [])
			.map((purchaseId) =>
				Object
					.assign(
						{id: purchaseId},
						currentEvent.purchases[purchaseId]
					)
				);

	const participantsBalance = {};
	//	вычисление баланса мероприятия для каждого учасника
	purchases.forEach(purchase => {
		purchase.participants.forEach(participant => {
			participantsBalance[participant] =
				(participantsBalance[participant] || 0)
					+ (((participant === purchase.payer) && purchase.amount)
						- (purchase.amount / purchase.participants.length));
		});
		if (purchase.participants.indexOf(purchase.payer) === -1) {
			participantsBalance[purchase.payer] =
				(participantsBalance[purchase.payer] || 0)
					+ purchase.amount;
		}
	});

	return participantsBalance;
}


export function getEventsParticipantsDebts(participantsBalance, currentEvent) {
	const reducedBalance = Object.assign({}, participantsBalance);

	//	массив для объектов вида
	// 	{
	// 		debt: 1000,
	// 		from: 'Андрей',
	// 		to: 'Дамир'
	// 	}
	const eventsParticipantsDebts = [];

	// вычисляем долг и запиываем в массив
	const payerReducer = function payerReducer(payerParticipant) {
		currentEvent.participants.forEach((participant) => {
			//	собираем долги с учасников с отрицательным балансов
			if (reducedBalance[participant] < 0) {
				//	вычисляем сколько может отдать текущий учасник с отрицательным балансом
				const currDebt = ((reducedBalance[payerParticipant] + reducedBalance[participant] >= 0)
						&& (reducedBalance[participant]))
							|| (reducedBalance[participant]
								- (reducedBalance[payerParticipant]
									+ reducedBalance[participant]));

				// записываем объект долга
				if (currDebt) {
					eventsParticipantsDebts.push({
						from: participant,
						to: payerParticipant,
						sum: currDebt,
					});
				}

				//	изменяем текущий баланс учасников, вычитая долг
				reducedBalance[participant] -= currDebt;
				reducedBalance[payerParticipant] += currDebt;
			}
		});
	};

	//	для каждого учасника с положительным балансом запускаем функцию сбора долгов
	currentEvent.participants.forEach((participant) => {
		if ((reducedBalance[participant]) > 0) {
			payerReducer(participant);
		}
	});

	return eventsParticipantsDebts;
}
