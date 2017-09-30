import React, { PropTypes } from 'react';
import EventHeader from '../event-header';
import GreySubtitle from '../GreySubtitle';
import UniversalListItem from '../universal-list-item';

const Menu = React.createClass({
	renderControls() {
		const { props } = this;
		const { currentEvent, currentUserName } = props;
		const isManager = currentUserName === currentEvent.manager;
		return (
			<div className="menu__top-bar">
				<div className="menu__icons icons-section">
					{isManager &&
						<div
							onClick={props.handleEdit}
							className="icons-section__icon icons-section__icon_event-edit"
						/>
					}
					<div
						onClick={props.handleHint}
						className="icons-section__icon icons-section__icon_show-hint"
					/>
				</div>
			</div>
		);
	},

	renderParticipant(name) {
		const { currentEvent, currentUserName } = this.props;
		const { manager } = currentEvent;
		let displayName = name;

		if (name === currentUserName) {
			displayName += ' (Вы)';
		}

		if (name === manager) {
			displayName += ' ★';
		}

		return (
			<UniversalListItem key={name}>
				{displayName}
			</UniversalListItem>
		);
	},

	render() {
		const { props } = this;
		const { currentEvent } = props;
		const classes = ['menu', `menu_${props.menuOpen ? 'open' : 'closed'}`];

		return (
			<div className={classes.join(' ')}>
				<div className="menu__inner">
					{this.renderControls()}
					<EventHeader name={currentEvent.name} subtitle={props.subtitle} />
					<GreySubtitle text="Участники" />
					<div className="menu__list">
						{currentEvent.participants.map(this.renderParticipant)}
					</div>
					<div onClick={props.handleRelogin} className="menu__bottom-bar bottom-bar">
						<div className="bottom-bar__icon" />
						<div className="bottom-bar__text">Войти под другим именем</div>
					</div>
					<div className="menu__manager-annotation">★ — организатор мероприятия</div>
				</div>
			</div>
		);
	},
});

Menu.propTypes = {
	currentEvent: PropTypes.object.isRequired,
	subtitle: PropTypes.string.isRequired,
};

export default Menu;
