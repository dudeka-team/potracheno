import React from 'react';
import withRouter from 'react-router/lib/withRouter';
import { connect } from 'react-redux';
import FormRow from '../form-row';
import FormLabel from '../form-label';
import FormInput from '../form-input';

import { saveFeedbackAsync } from '../../actions/save-feedback';

import { TopBar, TopBarHeading, TopBarIcon } from '../top-bar';
import Page from '../page';

const FeedBack = React.createClass({
	getInitialState(email = '', review = '') {
		return {
			email,
			review,
		};
	},

	goToEvents() {
		this.saveFeedback();
		this.props.router.push('/events');
	},

	saveFeedback() {
		const { state, props } = this;

		props.dispatch(saveFeedbackAsync({
			mail: state.email,
			problem: state.review,
		}));
	},

	handleChangeReview(event) {
		this.setState({
			review: event.target.value,
		});
	},

	handleChangeEmail(event) {
		this.setState({
			email: event.target.value,
		});
	},

	render() {
		const { email, review } = this.state;

		return (
			<Page>
				<Page.Header>
					<TopBar bordered>
						<TopBarIcon icon="close" onClick={this.goToEvents} />
						<TopBarHeading title="Написать разработчикам" />
						<TopBarIcon
							icon="check-active"
							disabled={review.trim() === ''}
							onClick={this.goToEvents}
						/>
					</TopBar>
				</Page.Header>

				<Page.Content style={{ padding: '8px 1rem 5rem' }}>
					<FormRow>
						<FormLabel htmlFor="review">Ваш отзыв</FormLabel>
						<FormInput
							id="review"
							value={review}
							onChange={this.handleChangeReview}
						/>
					</FormRow>

					<FormRow>
						<FormLabel htmlFor="email">Электронная почта (необязательно)</FormLabel>
						<FormInput
							id="email"
							type="email"
							value={email}
							onChange={this.handleChangeEmail}
						/>
					</FormRow>
				</Page.Content>
			</Page>
		);
	},
});

export default connect()(withRouter(FeedBack));
