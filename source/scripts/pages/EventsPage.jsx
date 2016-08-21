import React from 'react';

let data = [{
	title: 'Трип по Европе',
	date: '5 марта',
	sum: '5 490',
	direction: 'вам должны',
	id: '1',
	members: [{name: 'Вася'}, {name: 'Петя'}, {name: 'Миша'}]
},
{
	title: 'Поездка на дачу',
	date: '16 апреля',
	sum: '2 200',
	direction: 'вам должны',
	id: '2',
	members: [{name: 'Вася'}, {name: 'Петя'}, {name: 'Миша'}, {name: 'Витя'}]
}];


let EventListItems = React.createClass({
	render() {
		let listItems = this.props.data.map(item => {
			return (
				<li className="events-item" key={item.id}>
					<div className="events-item__title">{item.title}</div>
					<div className="events-item__result">
						<span className="events-item__sum">{`${item.sum} Р ${item.direction}`}</span>
					</div>
					<div className="events-item__description">
						<span className="events-item__members">{`${item.members.length} участников`}</span>
						<span className="events-item__date">{item.date}</span>
					</div>
				</li>
			);
		});
		return (
      		<ul className="events-list">
        		{listItems}
      		</ul>
    	);
	}
});


let EventsPage = React.createClass({
	getInitialState: function() {
		return {data: data};
	},
	render() {
		return  (
			<div className="events-box">
				<EventListItems data={this.state.data} />
			</div>
		);
	}
})


export default EventsPage;
