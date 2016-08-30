import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import {loadEventDataAsync} from '../../actions';

import Tabs from '../../components/Tabs';
import {TopBar, TopBarHeading, TopBarIcon} from '../../components/TopBar';

import Balance from './Balance';
import Purchases from './Purchases';
import Participants from './Participants';


const EventPage = React.createClass({
	componentDidMount() {
		const {params, dispatch} = this.props;
		dispatch(loadEventDataAsync(params.id));
	},

	goToEvents() {
		this.props.router.push('/events');
	},

	render() {
		const {props} = this;
		return (
			<div>
				{props.currentEvent ?
					<div>
						<TopBar>
							<TopBarIcon icon="arrow-back" onClick={this.goToEvents} />
							<TopBarHeading title="Дача у Дамира" subtitle="5 участников - 12 апреля" />
							<TopBarIcon icon="arrow-share" />
							<TopBarIcon icon="more-actions" />
						</TopBar>
						<Tabs
							config={[
								{
									name: 'purchases',
									labelContent: 'Покупки',
									content: <Purchases />,
								},
								{
									name: 'balance',
									labelContent: 'Баланс',
									content: <Balance />,
								},
								{
									name: 'members',
									labelContent: 'Участники',
									content: <Participants participants={[]} />,
								},
							]}
						/>
					</div>
					:
					<CircularProgress />
				}
			</div>
		);
	},
});

function mapStateToProps(state) {
	return {
		currentEvent: state.app.currentEvent,
	};
}

export default connect(mapStateToProps)(withRouter(EventPage));
