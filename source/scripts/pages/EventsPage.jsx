import React from 'react';

let data = [{
	title: 'Трип по Европе',
	date: '5 марта',
	sum: '5 490',
	direction: 'вам должны',
	id: '1'
},
{
	title: 'Поездка на дачу',
	date: '16 апреля',
	sum: '5 490',
	direction: 'вам должны',
	id: '2'
}];


let EventListItems = React.createClass({
	render() {
		let listItems = this.props.data.map(item => {
			return (
				<li className="events-item" key={item.id}>
					<div className="events-item__title">{item.title}</div>
					<div className="events-item__result">
						<span className="events-item__sum">5 490 Р вам должны</span>
					</div>
					<div className="events-item__description">
						<span className="events-item__members">5 участников</span>
						<span className="events-item__date">5 марта</span>
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
