import React from 'react';

const PurchasePage = React.createClass({
	goToEvent() {
		this.props.router.push(`/events/${this.props.params.id}`);
	},

	edit() {
		this.props.router.push(`/events/${this.props.params.id}`)
	},

	render() {
		const {state} = this;
		return (
			<div>
				<TopBar>
					<TopBarIcon icon="arrow-back" onClick={this.goToEvent} />
					<TopBarHeading title="Новая покупка" />
					<TopBarIcon icon="check-active" onClick={this.edit} />
				</TopBar>
				<NewPurchasePayer
					payer={state.payer ? state.payer.name : ''}
					onClick={() => {
						this.setState({
							popupOpened: true,
						});
					}}
				/>
				<Separator />
				<div style={{padding: '16px 16px 14px 16px'}}>
					<Input
						type="number"
						hint="0 руб."
						style={{
							fontSize: '30px',
							marginTop: '20px',
						}}
						label="Сумма"
						labelStyle={{
							top: '-21px',
							fontSize: '12px',
							color: '#818f99',
							opacity: '0',
							transition: 'opacity 0.15s',
						}}
						labelTransform={{
							opacity: '1',
						}}
						onChange={
							event => {
								const amount = Number(event.target.value);
								if (isNaN(amount)) {
									return;
								}
								this.calcLoans(amount);
							}
						}
					/>
					<Input
						style={{
							marginTop: '42px',
							fontSize: '16px',
						}}
						label="Название покупки"
						labelTransform={{
							transform: 'scale(0.75) translateY(-24px)',
							color: '#818f99',
						}}
						onChange={event => this.setState({name: event.target.value})}
					/>
				</div>
				<Separator />
				<div>
					<BlueSubtitle text="Участники покупки" />
					{
						this.state.participants
							.map((user, index) => {
								return (<UniversalListItem
									id={index}
									key={index}
									text={user.name}
									price={Math.round(user.loan * 10) / 10}
									onClick={
										() => {
											user.participate = !user.participate;
											this.setState({
												participants: this.state.participants,
											});
											this.calcLoans();
										}
									}
									isBordered
								/>);
							})
					}
				</div>
			</div>
		);
	},
});

export default connect()(PurchasePage);
