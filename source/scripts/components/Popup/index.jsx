import React from 'react';
import {TopBar, TopBarHeading, TopBarIcon} from '../TopBar';

const Popup = React.createClass({
    render() {
        return (
        	<div className="popup-container">
	            <div className="popup-layout"></div>
	        	<div className="popup-wrapper">
	        		<div className="popup-inner">
	        			{this.props.children}
	        		</div>
	        	</div>
	        </div>
        );
    }
});

module.exports = Popup;
