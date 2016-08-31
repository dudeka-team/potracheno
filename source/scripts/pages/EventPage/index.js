import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import {loadEventDataAsync} from '../../actions';

import Wrapper from '../../components/Wrapper';
import FlexContainer from '../../components/FlexContainer';
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
		const {currentEvent} = props;
		let purchases = [];
		if (currentEvent !== null && currentEvent.purchases !== undefined) {
			purchases = Object.keys(currentEvent.purchases).map(purchaseId => currentEvent.purchases[purchaseId]);
		}
		return (
			<Wrapper>
				{currentEvent ?
					<Wrapper>
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
									content: <Purchases params={{id: this.props.params.id}} purchases={purchases} />,
								},
								{
									name: 'balance',
									labelContent: 'Баланс',
									content: <Balance />,
								},
								{
									name: 'members',
									labelContent: 'Участники',
									content: <Participants participants={currentEvent.participants} />,
								},
							]}
						/>
					</Wrapper>
					:
					<FlexContainer alignItems="center" justifyContent="center">
						<CircularProgress />
					</FlexContainer>
				}
			</Wrapper>
		);
	},
});

function mapStateToProps(state) {
	return {
		currentEvent: state.app.currentEvent,
	};
}

export default connect(mapStateToProps)(withRouter(EventPage));
