import { eventsPage } from '../objects/events-page';

describe('Main page', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	specify('Empty state', () => {
		eventsPage.root().should('be.visible');
		eventsPage.placeholder().should('be.visible');
		eventsPage.addEventButton().should('be.visible');
	});
});
