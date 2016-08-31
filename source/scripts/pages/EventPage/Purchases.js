import React from 'react';
import {withRouter} from 'react-router';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import Fab from '../../components/Fab';
import PurchaseInfo from '../../components/PurchaseInfo';
import PurchaseListItem from '../../components/PurchaseListItem';
import Popup from '../../components/Popup';


const EventPurchasesPage = React.createClass({
	getInitialState() {
		return {
			popupOpened: false,
		};
	},

	openPopup() {
		this.setState({
			popupOpened: true,
		});
	},

	closePopup() {
		this.setState({
			popupOpened: false,
		});
	},

	goToNewPurchase() {
		this.props.router.push('/newpurchase');
	},

	render() {
		const {state} = this;
		return (
			<div>
				{state.popupOpened && (
					<Popup
						title="Шашлык"
						closeIcon
						onClose={this.closePopup}
					>
						<PurchaseInfo />
					</Popup>
				)}
				{this.props.purchases.map((item, i) => {
					return (
						<PurchaseListItem
							key={i}
							buyer={item.payer}
							title={item.name}
							subtitle={item.subtitle}
							price={item.amount}
							onClick={() => {
								this.setState({
									popupOpened: true,
								});
							}}
						/>
					);
				})}
				<Fab onClick={this.goToNewPurchase}><AddShoppingCart /></Fab>
			</div>
		);
	},
});

export default withRouter(EventPurchasesPage);
