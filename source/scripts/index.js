const app = {
	// Application Constructor
	initialize() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady() {
		app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent(id) {
		const parentElement = document.getElementById(id);
		const listeningElement = parentElement.querySelector('.listening');
		const receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');
	},
};
