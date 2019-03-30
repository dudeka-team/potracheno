import withRouter from 'react-router/lib/withRouter';
import { connect } from 'react-redux';
import { FeedbackPage as FeedbackPageView } from './view';

export const FeedbackPage = connect()(withRouter(FeedbackPageView));
