import React from 'react';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';


function getCheck(eventsParticipantsDebts) {
	return eventsParticipantsDebts
		.map((debt) => `${debt.from} → ${debt.to}   ${Math.abs(debt.sum)} руб.`);
}

const BalanceCheck = React.createClass({
	getInitialState() {
		return {
			expanded: false,
		};
	},

	handleCopy() {
		const {props} = this;
		const range = document.createRange();
		const selection = window.getSelection();
		selection.removeAllRanges();

		range.selectNode(this.checkContent);
		selection.addRange(range);

		try {
			if (!document.execCommand('copy')) {
				return props.onCopy('Устройство не поддерживает автоматическое копирование. Пожалуйста, скопируйте выделенный текст сами');
			}
			else {
				props.onCopy('Чек скопирован в буфер обмена');
			}
		} catch (e) {
			// eslint-disable-next-line max-len
			props.onCopy('Устройство не поддерживает автоматическое копирование. Пожалуйста, скопируйте выделенный текст сами');
		}

		selection.removeAllRanges();
	},

	handleToggle() {
		this.setState({
			expanded: !this.state.expanded,
		});
	},

	render() {
		const {props, state} = this;

		return (
			<div>
				<div className="balance-check">
					<BalanceCheckToggle isExpanded={state.expanded} onClick={this.handleToggle} />
					{state.expanded &&
						<div className="balance-check-content">
							<div
								className="balance-check-content__debts"
								ref={(checkContent) => (this.checkContent = checkContent)}
							>
								{getCheck(props.debts).map((row, index) => <p key={index}>{row}</p>)}
							</div>
							<BalanceCheckCopy onCopy={this.handleCopy} />
						</div>
					}
				</div>
			</div>
		);
	},
});

function BalanceCheckToggle(props) {
	const indicatorClasses = ['balance-check-toggle__indicator'];

	if (props.isExpanded) {
		indicatorClasses.push('balance-check-toggle__indicator_active');
	}

	return (
		<div className="balance-check-toggle" onClick={props.onClick}>
			<div className="balance-check-toggle__icon" />
			<div className="balance-check-toggle__text">
				<div className="balance-check-toggle__title">Чек</div>
				<div className="balance-check-toggle__subtitle">Баланс всего мероприятия</div>
			</div>
			<div className={indicatorClasses.join(' ')} />
		</div>
	);
}

function BalanceCheckCopy(props) {
	return (
		<div className="balance-check-copy" onClick={props.onCopy}>
			<ContentCopy className="balance-check-copy__icon" />
			<div className="balance-check-copy__annotation">Скопировать чек</div>
		</div>
	);
}

export default BalanceCheck;
