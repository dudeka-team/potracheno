import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TextField from 'material-ui/TextField';
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
								<TextField
									value={name}
									fullWidth
									onChange={(event) => props.handleParticipantChange(index, event.target.value)}
									onBlur={props.handleParticipantInputBlur}
								/>
							</div>
						);
					})}
				</div>
			</div>
		);
	},
});

function mapStateToProps(state) {
	return {
		isCreatingEvent: state.app.isCreatingEvent,
	};
}

export default connect(mapStateToProps)(withRouter(SecondStep));
