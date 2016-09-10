import React from 'react';

function getCheck(eventsParticipantsDebts) {
	return eventsParticipantsDebts
		.map((debt) => `${debt.to} ← ${debt.from}   ${Math.abs(debt.sum)} руб.`)
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
		const checkDiv = document.querySelector('.balance-check');
		checkDiv.textContent = getCheck(eventsParticipantsDebts);
		var range = document.createRange();
		range.selectNode(checkDiv);
		getSelection().addRange(range);
		try {
			document.execCommand('copy');
			this.setState({
				copied: true,
				resultMsg: 'Чек скопирован в буфер обмена',
			});
		} catch(err) {
			this.setState({
				resultMsg: 'Копирование текста на данном девайсе невозможно',
			});
		}
	},

	render() {
		const {state, props} = this;
		const {debts} = props;
		return (
			<div>
				<div className="balance-check"></div>
				{state.copied ?
					<div className="copy-result-msg">{state.resultMsg}</div>
					:
					<button onClick={() => this.selectAndCopy(debts)}> Скопировать чек </button>}
			</div>
		);
	}
});

export default BalanceCheck;
