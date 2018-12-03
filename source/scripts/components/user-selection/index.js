import React, { PureComponent } from 'react';
import withRouter from 'react-router/lib/withRouter';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import Wrapper from '../wrapper';
import EventHeader from '../event-header';
import GreySubtitle from '../grey-subtitle';
import UserSelectionListItem from '../user-selection-list-item';
import setLocalEvents from '../../actions/set-local-events';
import fetchUpdateParticipants from '../../actions/fetch-update-participants';
import FlexContainer from '../flex-container';
import Popup from '../popup';
import UserSelectionPopup from '../user-selection-popup';
import Spinner from '../spinner';

class UserSelection extends PureComponent {
	state = {
		name: '',
	};

	openPopup = () => this.setState({ popupOpened: true });
	closePopup = () => this.setState({ popupOpened: false });

	changeEventName = name => {
		this.props.dispatch(setLocalEvents(this.props.id, name));

		this.setState({ currentName: name });
	};

	userNameChangeHandler = event => {
		const { currentEvent } = this.props;
		const newUserName = event.target.value;
		const names = currentEvent.participants.map(name => name.toLowerCase());

		this.setState({
			isEmpty: false,
			name: newUserName,
			isDuplicate: names.indexOf(newUserName.toLowerCase()) !== -1,
		});
	};

	addNewParticipant = () => {
		const { name } = this.state;

		if (name === '') {
			this.setState({ isEmpty: true });
		} else {
			const { id, currentEvent } = this.props;
			const newParticipantsList = currentEvent.participants.slice();

			newParticipantsList.push(name);
			this.props.dispatch(fetchUpdateParticipants(id, newParticipantsList));
		}
	};

	formatSubtitle = currentEvent => {
		const participantsStatus = `${currentEvent.participants.length} участников`;
		const formattedStart = dayjs(currentEvent.start).format('DD MMMM');
		const formattedEnd = dayjs(currentEvent.end).format('DD MMMM');
		let formattedDate;

		if (formattedStart === formattedEnd) {
			formattedDate = formattedStart;
		} else {
			formattedDate = `${formattedStart}–${formattedEnd}`;
		}

		return `${participantsStatus} • ${formattedDate}`;
	};

	renderPreloader = () => (
		<FlexContainer fullHeight alignItems="center" justifyContent="center">
			<Spinner />
		</FlexContainer>
	);

	renderPopup = () => (
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
			<UserSelectionPopup
				name={this.state.name}
				onChangeName={this.userNameChangeHandler}
			/>
		</Popup>
	);

	render() {
		const { props, state } = this;
		const { currentEvent } = props;

		if (!currentEvent) {
			return this.renderPreloader();
		}

		return (
			<Wrapper>
				{state.popupOpened && this.renderPopup()}
				<div className="user-selection">
					<div className="user-selection__top-bar">
						<div className="user-selection__invite-text">
							<span className="user-selection__invite-author">
								{currentEvent.manager}
							</span>
							{' прислал(-а) вам приглашение на мероприятие'}
						</div>
					</div>

					<EventHeader
						userSelection
						name={currentEvent.name}
						subtitle={`${this.formatSubtitle(currentEvent)}`}
					/>

					<GreySubtitle userSelection>
						Выберите себя среди участников
					</GreySubtitle>

					<div className="user-selection__list">
						{currentEvent.participants.sort().map(participant => (
							<UserSelectionListItem
								key={participant}
								onClick={() => this.changeEventName(participant)}
								text={participant}
							/>
						))}
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
	}
}

function mapStateToProps({ events }) {
	return {
		currentEvent: events.currentEvent,
		isFetchingEvent: events.isFetchingEvent,
		localEvents: events.localEvents,
	};
}

export default connect(mapStateToProps)(withRouter(UserSelection));
