import React from 'react';
import {withRouter} from 'react-router';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import {TopBar, TopBarHeading, TopBarIcon} from '../../components/TopBar';


const SecondStep = React.createClass({
	goToPrevPage() {
		this.props.router.push('/events/new/step1');
	},

	render() {
		const {props} = this;
		return (
			<div>
				<TopBar>
					<TopBarIcon icon="arrow-back" onClick={this.goToPrevPage} />
					<TopBarHeading title="Добавить участников" />
					{props.isSavingData ?
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

export default withRouter(SecondStep);
