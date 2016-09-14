import React from 'react';

function getCheck(eventsParticipantsDebts) {
	return eventsParticipantsDebts
		.map((debt) => `${debt.from} → ${debt.to}   ${Math.abs(debt.sum)} руб.`)
		.join('\n------------------------\n');
}

const BalanceCheck = React.createClass({
	getInitialState() {
		return {
			copied: false,
			resultMsg: '',
		};
	},

	selectAndCopy(eventsParticipantsDebts) {
		const checkDiv = document.querySelector('.balance-check__copy-text');
		checkDiv.textContent = getCheck(eventsParticipantsDebts);
		const range = document.createRange();
		range.selectNode(checkDiv);
		getSelection().addRange(range);
		try {
			document.execCommand('copy');
			this.setState({
				copied: true,
				resultMsg: 'Чек скопирован в буфер обмена',
			});
		} catch (err) {
			this.setState({
				resultMsg: 'Копирование текста на данном девайсе невозможно',
			});
		}
	},

	render() {
		const {props} = this;
		const {debts} = props;
		return (
			<div>
				<div className="balance-check" onClick={() => this.selectAndCopy(debts)}>
					<div className="balance-check__icon" />
					<div className="balance-check__content">
						<div className="balance-check__title">Чек мероприятия</div>
						<div className="balance-check__subtitle">Скопировать чек</div>
					</div>
					<div className="balance-check__copy-text" />
				</div>
			</div>
		);
	},
});

export default BalanceCheck;
