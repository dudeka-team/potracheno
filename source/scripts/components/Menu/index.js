import React, {PropTypes} from 'react';
import EventStatus from '../EventStatus';
import BlueSubtitle from '../BlueSubtitle';
import UniversalListItem from '../UniversalListItem';

const Menu = React.createClass({
	render() {
		const {props} = this;
		const {currentEvent} = props;
		const {participantName} = currentEvent;
		const classes = ['menu', `menu_${props.menuOpen ? 'open' : 'closed'}`];
		const isManager = participantName === currentEvent.manager;

		return (
			<div className={classes.join(' ')}>
				<div className="menu__wrapper" onClick={props.closeMenu}>
					<div className="menu__inner">
						{isManager &&
							<div className="menu__top-bar">
								<div className="menu__icons icons-section">
									<div
										onClick={props.handleEdit}
										className="icons-section__icon icons-section__icon_event-edit"
									/>
									<div className="icons-section__icon icons-section__icon_add-person" />
								</div>
							</div>
						}
						<EventStatus name={currentEvent.name} subtitle={props.subtitle} />
						<BlueSubtitle text="Участники" />
						<div className="menu__list">
							{currentEvent.participants.map((item) => {
								return (
									<UniversalListItem
										key={item}
										text={participantName === item ? `${item} (Вы)` : item}
										isIcon
									/>
								);
							})}
						</div>
						<div onClick={props.handleRelogin} className="menu__bottom-bar bottom-bar">
							<div className="bottom-bar__icon" />
							<div className="bottom-bar__text">Войти под другим именем</div>
						</div>
					</div>
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


// Example
// <Menu participants={currentEvent.participants}
// 		name={currentEvent.name}
// 		subtitle={this.formatSubtitle(currentEvent)}
// />
