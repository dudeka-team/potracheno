import withRouter from 'react-router/lib/withRouter';
import { connect } from 'react-redux';
import { EditEvent as EditEventView } from './view';

function mapStateToProps({ events }) {
	return {
		isCreatingEvent: events.isCreatingEvent,
	};
}

export const EditEvent = connect(mapStateToProps)(withRouter(EditEventView));
