import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {TopBar, TopBarHeading, TopBarIcon} from '../../components/TopBar';


export default function NewEventFirst(props) {
	return (
		<div>
			<TopBar>
				<TopBarIcon icon="arrow-back" onClick={props.onBack} />
				<TopBarHeading title="Новое мероприятие" />
				<TopBarIcon
					icon="arrow-forward-blue"
					onClick={props.onForward}
					disabled={!props.secondStepAvailable}
				/>
			</TopBar>

			<div style={{padding: '0 1rem'}}>
				<TextField
					fullWidth
					floatingLabelText="Название мероприятия"
					value={props.eventName}
					onChange={props.onEditEventName}
				/>

				<DatePicker
					fullWidth
					floatingLabelText="Начало"
					formatDate={formatDate}
					onChange={props.onSetStartDate}
					minDate={props.start}
					value={props.start}
				/>
				<DatePicker
					fullWidth
					floatingLabelText="Завершение"
					formatDate={formatDate}
					onChange={props.onSetEndDate}
					minDate={props.start}
					value={props.end}
				/>
			</div>
		</div>
	);
}

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
// eslint-disable-next-line max-len
const months = ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Нояб', 'Дек'];

function formatDate(date) {
	// eslint-disable-next-line max-len
	return `${days[date.getDay() - 1]}, ${date.getDate()} ${months[date.getMonth()].toLowerCase()} ${date.getFullYear()}`;
}
