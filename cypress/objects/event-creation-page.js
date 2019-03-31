class EventCreationPage {
	root() {
		return cy.get('[data-marker="event-creation-page"]');
	}

	submit() {
		return cy.get('[data-marker="event-creation-page/submit"]');
	}

	back() {
		return cy.get('[data-marker="event-creation-page/back"]');
	}
}

export const eventCreationPage = new EventCreationPage();
