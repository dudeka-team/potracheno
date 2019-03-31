Cypress.Commands.add('openEventsPage', () => {
	cy.visit('/events');
});

Cypress.Commands.add('openFeedbackPage', () => {
	cy.visit('/feedback');
});

Cypress.Commands.add('openEventCreationPage', () => {
	cy.visit('/events/new');
});
