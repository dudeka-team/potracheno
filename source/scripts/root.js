import React from 'react';
import { hot } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import browserHistory from 'react-router/lib/browserHistory';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import Routes from './Routes';

const accentColor = '#ffe151';
const accentDarkColor = '#f7cc00';

const dudekaTheme = getMuiTheme({
	datePicker: {
		color: accentDarkColor,
		textColor: '#333',
		selectColor: accentColor,
		selectTextColor: '#fff',
	},
	flatButton: {
		textColor: '#3f95ff',
		primaryTextColor: '#3f95ff',
	},
});

function Root() {
	return (
		<MuiThemeProvider muiTheme={dudekaTheme}>
			<Provider store={store}>
				<Routes history={syncHistoryWithStore(browserHistory, store)} />
			</Provider>
		</MuiThemeProvider>
	);
}

export default hot(module)(Root);
