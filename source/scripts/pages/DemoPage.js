import React from 'react';
import IconOpenInNew from 'material-ui/svg-icons/action/open-in-new';
import Fab from '../components/Fab';
import Popup from '../components/Popup';
import PurchaseInfo from '../components/PurchaseInfo';
import EventActionListItem from '../components/EventActionListItem';

export default React.createClass({
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

	render() {
		const {state} = this;
		return (
			<div>
				<EventActionListItem />
				<Fab onClick={this.openPopup}><IconOpenInNew /></Fab>
				{state.popupOpened &&
					<Popup
						title="Шашлык"
						closeIcon
						okButton={{
							text: 'Добавить',
							onClick: this.closePopup,
						}}
						cancelButton={{
							text: 'Отменить',
							onClick: this.closePopup,
						}}
						onClose={this.closePopup}
					>
						<PurchaseInfo />
					</Popup>
				}
			</div>
		);
	},
});
