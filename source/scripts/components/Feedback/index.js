import React from 'react';
import withRouter from 'react-router/lib/withRouter';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import { saveFeedbackAsync } from '../../actions/saveFeedback';

import { TopBar, TopBarHeading, TopBarIcon } from '../TopBar';
import { Page, PageContent } from '../Page';

const FeedBack = React.createClass({
	getInitialState(mail = '', problem = '') {
		return {
			mail,
			problem,
		};
	},

	goToEvents() {
		this.saveFeedback();
		this.props.router.push('/events');
	},

	saveFeedback() {
		const { state, props } = this;
		props.dispatch(saveFeedbackAsync({
			mail: state.mail,
			problem: state.problem,
		}));
	},

	handleProblemChange(event) {
		this.setState({
			problem: event.target.value,
		});
	},

	handleMailChange(event) {
		this.setState({
			mail: event.target.value,
		});
	},

	render() {
		const { state } = this;
		const labelStyle = { color: '#949A9E' };
		const underLineStyle = { borderColor: '#ffe151' };

		return (
			<Page>
				<TopBar bordered>
					<TopBarIcon icon="close" onClick={this.goToEvents} />
					<TopBarHeading title="Написать разработчикам" />
					<TopBarIcon
						icon="check-active"
						disabled={state.problem.trim() === ''}
						onClick={this.goToEvents}
					/>
				</TopBar>
				<PageContent style={{ padding: '8px 1rem 5rem' }}>
					<TextField
						floatingLabelFocusStyle={labelStyle}
						underlineFocusStyle={underLineStyle}
						fullWidth
						floatingLabelStyle={{ color: '#949A9E' }}
						floatingLabelText="Ваш отзыв"
						hintStyle={{ color: '#949A9E' }}
						onChange={this.handleProblemChange}
					/>
					<TextField
						fullWidth
						floatingLabelFocusStyle={labelStyle}
						underlineFocusStyle={underLineStyle}
						floatingLabelStyle={{ color: '#949A9E' }}
						floatingLabelText="Электронная почта (необязательно)"
						hintStyle={{ color: '#949A9E' }}
						onChange={this.handleMailChange}
					/>
				</PageContent>
			</Page>
		);
	},
});

export default connect()(withRouter(FeedBack));
