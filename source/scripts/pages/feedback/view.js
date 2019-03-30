import React from 'react';
import FormRow from '~/components/form-row';
import FormLabel from '~/components/form-label';
import FormInput from '~/components/form-input';

import { saveFeedbackAsync } from '~/actions/save-feedback';

import { TopBar, TopBarHeading, TopBarIcon } from '~/components/top-bar';
import Page from '~/components/page';

export class FeedbackPage extends React.Component {
	state = {
		email: '',
		review: '',
	};

	goToEvents = () => {
		this.saveFeedback();
		this.props.router.push('/events');
	};

	saveFeedback = () => {
		const { state, props } = this;

		if (state.review.trim() === '') {
			return;
		}

		props.dispatch(
			saveFeedbackAsync({
				mail: state.email,
				problem: state.review,
			})
		);
	};

	handleChangeReview = event => {
		this.setState({
			review: event.target.value,
		});
	};

	handleChangeEmail = event => {
		this.setState({
			email: event.target.value,
		});
	};

	render() {
		const { email, review } = this.state;

		return (
			<Page data-marker="feedback-page">
				<Page.Header>
					<TopBar bordered>
						<TopBarIcon
							data-marker="feedback-page/back"
							icon="close"
							onClick={this.goToEvents}
						/>
						<TopBarHeading
							data-marker="feedback-page/title"
							title="Написать разработчикам"
						/>
						<TopBarIcon
							data-marker="feedback-page/submit"
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
							data-marker="feedback-page/feedback-field"
							id="review"
							value={review}
							onChange={this.handleChangeReview}
						/>
					</FormRow>

					<FormRow>
						<FormLabel htmlFor="email">
							Электронная почта (необязательно)
						</FormLabel>
						<FormInput
							data-marker="feedback-page/email-field"
							id="email"
							type="email"
							value={email}
							onChange={this.handleChangeEmail}
						/>
					</FormRow>
				</Page.Content>
			</Page>
		);
	}
}
