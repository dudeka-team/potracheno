import React from 'react';
import PersonAdd from 'material-ui/svg-icons/social/person-add';

import PurchaseListItem from '../components/PurchaseListItem';
import Fab from '../components/Fab';

const EventPurchasesPage = React.createClass({
	render() {
		return (
			<div>
				<PurchaseListItem
					buyer="Андрей"
					title="Шашлык"
					subtitle="все 5 участников"
					price={1500}
				/>
				<PurchaseListItem
					buyer="Андрей"
					title="Шашлык"
					subtitle="все 5 участников"
					price={1500}
				/>
				<PurchaseListItem
					buyer="Андрей"
					title="Шашлык"
					subtitle="все 5 участников"
					price={1500}
				/>
				<Fab icon={<PersonAdd />} />
			</div>
			);
	},
});

export default EventPurchasesPage;
