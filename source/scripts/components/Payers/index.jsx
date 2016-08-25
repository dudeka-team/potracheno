import React from 'react';
import List from 'components/List';
import ListItem from 'components/ListItem';


const data = {
	payers: [{
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
		}],
};

const Payers = React.createClass({
	getInitialState() {
		return {
			data,
		};
	},
	render() {
		let listItems = this.state.data.payers.map(item => {
			return (
				<ListItem id={item.id} text={item.name} key={item.id} isCheckBox={false} iconId={7} />
			);
		});
		return (
			<div className="payers">
				<List>
					{listItems}
				</List>
			</div>
		);
	},
});


export default Payers;
