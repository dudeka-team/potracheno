import React, {PropTypes} from 'react';
import Chip from '../Chip';
import EventStatus from '../EventStatus';
import BlueSubtitle from '../BlueSubtitle';
import UniversalListItem from '../UniversalListItem';

const Drover = React.createClass({
	render() {
		const classes = ['drover'];
		const {props} = this;
		if (props.droverOpen) {
			classes.push('drover_open');
		} else {
			classes.push('drover_closed');
		}
		return (
			<div className={classes.join(' ')}>
				<div className="drover__wrapper" onClick={props.closeDrover}>
					<div className="drover__inner">
						<div className="drover__top-bar">
							<Chip className="drover__chip" text="Дамир(Вы)" />
							<div className="drover__icons icons-section">
								<div className="icons-section__icon icons-section__icon_event-edit" />
								<div className="icons-section__icon icons-section__icon_add-person" />
							</div>
						</div>
						<EventStatus name={props.name} subtitle={props.subtitle} />
						<BlueSubtitle text="Участники" />
						<div className="drover__list">
							{props.participants.map((item) => {
								return (
									<UniversalListItem text={item} isIcon />
								);
							})}
						</div>
						<div className="drover__bottom-bar bottom-bar">
							<div className="bottom-bar__icon" />
							<div className="bottom-bar__text">Покинуть мероприятие</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

Drover.propTypes = {
	participants: PropTypes.object.isRequired,
	name: PropTypes.string,
	subtitle: PropTypes.string,
};

export default Drover;


// Example
// <Drover participants={currentEvent.participants}
// 		name={currentEvent.name}
// 		subtitle={this.formatSubtitle(currentEvent)}
// />
