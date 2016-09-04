import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import NewPurchasePage from './NewPurchasePage';
import fetchEventData from '../actions/fetchEventData';

const VIEW = "VIEW";
const EDIT = "EDIT";

const PurchasePage = React.createClass({
	componentDidMount() {
		const {props} = this;
		props.dispatch(fetchEventData(props.params.id));
	},
	
	render() {
		const {currentEvent} = this.props;
		const {purchase_id, id} = this.props.params;
		const purchase = currentEvent && currentEvent.purchases && currentEvent.purchases[purchase_id];
		return (
			<NewPurchasePage
				mode={EDIT}
				params={{id, purchase_id}}
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
