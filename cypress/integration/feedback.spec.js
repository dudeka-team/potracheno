import { eventsPage } from '../objects/events-page';
import { feedbackPage } from '../objects/feedback-page';

describe('Feedback page', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	specify('should be available from events page', () => {
		eventsPage.root().should('be.visible');
		eventsPage.feedbackButton().should('be.visible');
		eventsPage.feedbackButton().click();

		eventsPage.root().should('not.be.visible');
		feedbackPage.root().should('be.visible');
		feedbackPage.back().should('be.visible');
		feedbackPage.submit().should('be.visible');
		feedbackPage.feedbackField().should('be.visible');
		feedbackPage.emailField().should('be.visible');
	});

	specify('should have working back button', () => {
		cy.openFeedbackPage();

		feedbackPage.back().should('be.visible');
		feedbackPage.back().click();

		feedbackPage.root().should('not.be.visible');
		eventsPage.root().should('be.visible');
	});

	specify('should return to events page after submit', () => {
		cy.openFeedbackPage();

		feedbackPage.feedbackField().type('Hello from E2E tests!');
		feedbackPage.emailField().type('e2e@tests.com');
		feedbackPage.submit().click();

		feedbackPage.root().should('not.be.visible');
		eventsPage.root().should('be.visible');
	});

	specify('should be able to submit review without email', () => {
		cy.openFeedbackPage();

		feedbackPage.feedbackField().type('Hello from E2E tests!');
		feedbackPage.submit().click();

		feedbackPage.root().should('not.be.visible');
		eventsPage.root().should('be.visible');
	});
});
