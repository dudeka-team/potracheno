import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Input from '../../components/Input';
import CircularProgress from 'material-ui/CircularProgress';
import {TopBar, TopBarHeading, TopBarIcon} from '../../components/TopBar';


const SecondStep = React.createClass({
	render() {
		const {props} = this;
		return (
			<div>
				<TopBar>
					<TopBarIcon icon="arrow-back" onClick={props.goToFirstStep} />
					<TopBarHeading title="Добавить участников" />
					{props.isCreatingEvent ?
						<CircularProgress size={0.3} />
						:
						<TopBarIcon icon="check-active" onClick={props.save} disabled={!props.saveAvailable} />
					}
				</TopBar>

				<div style={{padding: '0 20px'}}>
					{props.participants.map((name, index) => {
						return (
							<div key={index}>
								<Input
									hint='Имя участника'
									style={{
										fontSize: '16px',
										marginTop: '20px',
									}}
									onChange={event => props.handleParticipantChange(index, event.target.value)}
								/>
							</div>
						);
					})}
				</div>
			</div>
		);
	},
});

function mapStateToProps({events}) {
	return {
		isCreatingEvent: events.isCreatingEvent,
	};
}

export default connect(mapStateToProps)(withRouter(SecondStep));
