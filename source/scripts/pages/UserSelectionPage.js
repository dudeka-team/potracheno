import React from 'react';
import {withRouter, Link} from 'react-router';
import {connect} from 'react-redux';

const UserSelectionPage = React.createClass({
	render() {
		return (
			<div>
				<ul>
					<li><a>Юра</a></li>
					<li><a>Женя</a></li>
					<li><a>Андрей</a></li>
				</ul>
			</div>		
		);
	},
});

export default connect()(withRouter(UserSelectionPage));
