import React from 'react';
import UniversalListItem from '../UniversalListItem';

const Payers = React.createClass({
	render() {
		return (
			<div className="payers">
				{this.props.payers.map((item, index) => {
					return (
						<UniversalListItem
							onClick={() => this.props.changePayer(item)}
							id={index}
							text={item.name} key={index}
							iconId={7}
							checkMark={item.isPayer}
						/>
					);
				})}
			</div>
		);
	},
});


export default Payers;
