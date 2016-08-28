import React from 'react';
import UniversalListItem from '../UniversalListItem';


const data = {
	payers: [
		{
			name: 'Петя',
			id: 1,
		},
		{
			name: 'Вася',
			id: 2,
		},
		{
			name: 'Катя',
			id: 3,
		},
		{
			name: 'Вася',
			id: 4,
		},
		{
			name: 'Катя',
			id: 5,
		},
		{
			name: 'Вася',
			id: 6,
		},
		{
			name: 'Катя',
			id: 7,
		},
	],
};

const Payers = React.createClass({
	getInitialState() {
		return {
			data,
		};
	},
	render() {
		return (
			<div className="payers">
				{this.state.data.payers.map(item => {
					return (
						<UniversalListItem
							changePayer={this.props.changePayer}
							id={item.id}
							text={item.name} key={item.id}
							iconId={7}
						/>
					);
				})}
			</div>
		);
	},
});


export default Payers;
