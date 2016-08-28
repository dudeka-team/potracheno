import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'react-fastclick';

import {appReducer} from './reducers/app';
import Routes from './Routes';

injectTapEventPlugin();
moment.locale('ru');

const store = createStore(
	combineReducers({
		app: appReducer,
		routing: routerReducer,
	}),
	window.devToolsExtension && window.devToolsExtension()
);

// eslint-disable-next-line import/prefer-default-export
export const history = syncHistoryWithStore(hashHistory, store);

document.addEventListener('DOMContentLoaded', onDeviceReady);

function onDeviceReady() {
	ReactDOM.render(<AppRoot />, document.querySelector('#app'));
}

function AppRoot() {
	return (
		<MuiThemeProvider>
			<Provider store={store}>
				<Routes history={history} />
			</Provider>
		</MuiThemeProvider>
	);
}

var url_parser={
		get_args: function (s) {
			var tmp=new Array();
			s=(s.toString()).split('&');
			for (var i in s) {
				i=s[i].split("=");
				tmp[(i[0])]=i[1];
			}
			return tmp;
		},
		get_args_cookie: function (s) {
			var tmp=new Array();
			s=(s.toString()).split('; ');
			for (var i in s) {
				i=s[i].split("=");
				tmp[(i[0])]=i[1];
			}
			return tmp;		
		}
};

var plugin_vk = {
	wwwref: false,
	plugin_perms: "friends,wall,photos,wall,offline,notes",
	
	auth: function (force) {
		if (!window.localStorage.getItem("plugin_vk_token") || force || window.localStorage.getItem("plugin_vk_perms")!=plugin_vk.plugin_perms) {
			var authURL="https://oauth.vk.com/authorize?client_id=12345&scope="+this.plugin_perms+"&redirect_uri=http://oauth.vk.com/blank.html&display=touch&response_type=token";
			this.wwwref = window.open(encodeURI(authURL), '_blank', 'location=no');
			this.wwwref.addEventListener('loadstop', this.auth_event_url);
			console.log('waiting');
		}
	},
	auth_event_url: function (event) {
		console.log("done");
		var tmp=(event.url).split("#");
		if (tmp[0]=='https://oauth.vk.com/blank.html' || tmp[0]=='http://oauth.vk.com/blank.html') {
			plugin_vk.wwwref.close();
			var tmp=url_parser.get_args(tmp[1]);
			console.log(event);
			window.localStorage.setItem("plugin_vk_token", tmp['access_token']);
			window.localStorage.setItem("plugin_vk_user_id", tmp['user_id']);
			window.localStorage.setItem("plugin_fb_exp", tmp['expires_in']);
			window.localStorage.setItem("plugin_vk_perms", plugin_vk.plugin_perms);
		}
	}
};

plugin_vk.auth(false)
