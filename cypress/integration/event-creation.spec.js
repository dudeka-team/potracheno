import { eventsPage } from '../objects/events-page';
import { eventCreationPage } from '../objects/event-creation-page';

describe('Event creation page', () => {
	specify('should be available from events page', () => {
		cy.openEventsPage();
		eventsPage.root().should('be.visible');
		eventsPage.addEventButton().should('be.visible');
		eventCreationPage.root().should('not.be.visible');

		eventsPage.addEventButton().click();

		eventCreationPage.root().should('be.visible');
	});

	specify('should have working back button', () => {
		cy.openEventCreationPage();

		eventsPage.root().should('not.be.visible');
		eventCreationPage.back().click();
		eventsPage.root().should('be.visible');
		eventCreationPage.root().should('not.be.visible');
	});
});
