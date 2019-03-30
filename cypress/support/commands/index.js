import { eventsPage } from '../../objects/events-page';
import { feedbackPage } from '../../objects/feedback-page';

Cypress.Commands.add('openFeedbackPage', () => {
	cy.visit('/');
	feedbackPage.root().should('not.be.visible');
	eventsPage.root().should('be.visible');
	eventsPage.feedbackButton().should('be.visible');

	eventsPage.feedbackButton().click();

	eventsPage.root().should('not.be.visible');
	feedbackPage.root().should('be.visible');
});
