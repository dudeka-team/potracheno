import React from 'react';
import withRouter from 'react-router/lib/withRouter';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import Wrapper from '../Wrapper';
import EventStatus from '../EventStatus';
import GreySubtitle from '../GreySubtitle';
import UserSelectionListItem from '../UserSelectionListItem';
import setLocalEvents from '../../actions/setLocalEvents';
import fetchUpdateParticipants from '../../actions/fetchUpdateParticipants';
import FlexContainer from '../FlexContainer';
import Popup from '../Popup';
import UserSelectionPopup from '../UserSelectionPopup';

const UserSelection = React.createClass({
	getInitialState() {
		return {
			name: '',
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

	changeEventName(name) {
		this.props.dispatch(
			setLocalEvents(
				this.props.id,
				name
			)
		);
		this.setState({
			currentName: name,
		});
	},

	userNameChangeHandler(event) {
		const {currentEvent} = this.props;
		const newUserName = event.target.value;
		const names = currentEvent.participants.map(name => name.toLowerCase());
		this.setState({
			isEmpty: false,
			name: newUserName,
			isDuplicate: names.indexOf(newUserName.toLowerCase()) !== -1,
		});
	},

	addNewParticipant() {
		const {name} = this.state;

		if (name === '') {
			this.setState({isEmpty: true});
		} else {
			const {id, currentEvent} = this.props;
			const newParticipantsList = currentEvent.participants.slice();

			newParticipantsList.push(name);
			this.props.dispatch(fetchUpdateParticipants(id, newParticipantsList));
		}
	},

	formatSubtitle(currentEvent) {
		const participantsStatus = `${currentEvent.participants.length} участников`;
		const formattedStart = moment(currentEvent.start).format('DD MMMM');
		const formattedEnd = moment(currentEvent.end).format('DD MMMM');
		let formattedDate;

		if (formattedStart === formattedEnd) {
			formattedDate = formattedStart;
		} else {
			formattedDate = `${formattedStart}–${formattedEnd}`;
		}

		return `${participantsStatus} • ${formattedDate}`;
	},

	renderPreloader() {
		return (
			<FlexContainer fullHeight alignItems="center" justifyContent="center">
				<CircularProgress color="#ffe151" />
			</FlexContainer>
		);
	},

	renderPopup() {
		return (
			<Popup
				unBordered
				largeHeader
				title="Добавить себя"
				okButton={{
					text: 'Войти',
					onClick: () => {
						this.addNewParticipant();
						this.changeEventName(this.state.name);
					},
				}}
				cancelButton={{
					text: 'Отмена',
					onClick: this.closePopup,
				}}
				onClose={this.closePopup}
			>
				<UserSelectionPopup userNameChange={this.userNameChangeHandler} />
			</Popup>
		);
	},

	render() {
		const {props, state} = this;
		const {currentEvent} = props;

		if (!currentEvent) {
			return this.renderPreloader();
		}

		return (
			<Wrapper>
				{state.popupOpened && this.renderPopup()}
				<div className="user-selection">
					<div className="user-selection__top-bar">
						<div className="user-selection__invite-text">
							<span className="user-selection__invite-author">{currentEvent.manager}</span>
							{' прислал(-а) вам приглашение на мероприятие'}
						</div>
					</div>
					<EventStatus
						name={currentEvent.name}
						subtitle={`${this.formatSubtitle(currentEvent)}`}
						userSelection
					/>
					<GreySubtitle text="Выберите себя среди участников" userSelection />
					<div className="user-selection__list">
						{currentEvent.participants.sort().map(participant => {
							return (
								<UserSelectionListItem
									key={participant}
									onClick={() => this.changeEventName(participant)}
									text={participant}
								/>
							);
						})}
						<div
							className="user-selection__add-participant-button"
							onClick={this.openPopup}
						>
							Добавить себя
						</div>
					</div>
				</div>
			</Wrapper>
		);
	},
});


function mapStateToProps({events}) {
	return {
		currentEvent: events.currentEvent,
		isFetchingEvent: events.isFetchingEvent,
		localEvents: events.localEvents,
	};
}

export default connect(mapStateToProps)(withRouter(UserSelection));
