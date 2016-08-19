import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './Routes';


document.addEventListener('deviceready', onDeviceReady);

function onDeviceReady() {
	ReactDOM.render(<Routes />, document.querySelector('#app'));
}
