class FeedbackPage {
	root() {
		return cy.get('[data-marker="feedback-page"]');
	}

	title() {
		return cy.get('[data-marker="feedback-page/title"]');
	}

	feedbackField() {
		return cy.get('[data-marker="feedback-page/feedback-field"]');
	}

	emailField() {
		return cy.get('[data-marker="feedback-page/email-field"]');
	}

	back() {
		return cy.get('[data-marker="feedback-page/back"]');
	}

	submit() {
		return cy.get('[data-marker="feedback-page/submit"]');
	}
}

export const feedbackPage = new FeedbackPage();
