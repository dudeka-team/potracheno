import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {NewPurchasePage} from './NewPurchasePage';

const VIEW = "VIEW";

const PurchasePage = React.createClass({
	getInitialState() {
		dispatch(loadEventDataAsync(params.id));

	},
	
	render() {
		const {currentEvent} = this.props;
		const purchase = currentEvent && currentEvent.purchases && currentEvent.purchases[this.props.params.purchase_id];
		return (
			<NewPurchasePage
				mode={VIEW}
				purchase={purchase}
			/>
		);
	}
});

function mapStateToProps({events}) {
	return {
		currentEvent: events.currentEvent,
	};
}

export default withRouter(connect(mapStateToProps)(PurchasePage));
