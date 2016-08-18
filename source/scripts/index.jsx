import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


document.addEventListener('deviceready', onDeviceReady);

function onDeviceReady() {
	ReactDOM.render(<App />, document.querySelector('#app'));
}
