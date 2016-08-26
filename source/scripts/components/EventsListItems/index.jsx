import React from 'react';

export default function EventsListItems(props) {
	return (
		<ul className="events-list">
			{props.data.map(item => {
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
			})}
		</ul>
	);
}
