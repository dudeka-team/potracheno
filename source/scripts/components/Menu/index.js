import React, {PropTypes} from 'react';
import Chip from '../Chip';
import EventStatus from '../EventStatus';
import BlueSubtitle from '../BlueSubtitle';
import UniversalListItem from '../UniversalListItem';

const Menu = React.createClass({
	render() {
		const classes = ['menu'];
		const {props} = this;
		if (props.menuOpen) {
			classes.push('menu_open');
		} else {
			classes.push('menu_closed');
		}
		return (
			<div className={classes.join(' ')}>
				<div className="menu__wrapper" onClick={props.closeMenu}>
					<div className="menu__inner">
						<div className="menu__top-bar">
							<Chip className="menu__chip" text="Дамир(Вы)" />
							<div className="menu__icons icons-section">
								<div className="icons-section__icon icons-section__icon_event-edit" />
								<div className="icons-section__icon icons-section__icon_add-person" />
							</div>
						</div>
						<EventStatus name={props.name} subtitle={props.subtitle} />
						<BlueSubtitle text="Участники" />
						<div className="menu__list">
							{props.participants.map((item) => {
								return (
									<UniversalListItem text={item} isIcon />
								);
							})}
						</div>
						<div className="menu__bottom-bar bottom-bar">
							<div className="bottom-bar__icon" />
							<div className="bottom-bar__text">Покинуть мероприятие</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

Menu.propTypes = {
	participants: PropTypes.object.isRequired,
	name: PropTypes.string,
	subtitle: PropTypes.string,
};

export default Menu;


// Example
// <Menu participants={currentEvent.participants}
// 		name={currentEvent.name}
// 		subtitle={this.formatSubtitle(currentEvent)}
// />
