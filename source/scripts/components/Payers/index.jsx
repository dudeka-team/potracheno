import React from 'react';
import UniversalListItem from '../UniversalListItem';

const Payers = React.createClass({
	render() {
		return (
			<div className="payers">
				{this.props.payers.map(item => {
					return (
						<UniversalListItem
							changePayer={() => this.props.changePayer(item)}
							id={item.id}
							text={item.name} key={item.id}
							iconId={7}
							checkMark={item.chosed}
						/>
					);
				})}
			</div>
		);
	},
});


export default Payers;
