import React from 'react';

export const Popup = React.createClass({
    render() {
        return (
        	<div className="popup-container">
	            <div className="popup-layout"></div>
	        	<div className="popup-wrapper">
	        		<div className="popup-inner">
				        <div className="popup-header">
				        	{this.props.closeIcon && <div className="popup-header__icon popup-header__icon_burger"></div>}
				            <div className="popup-header__title">
				            	{this.props.title}
				            </div>
			        	</div>	
	        			{this.props.children}
	        		</div>
	        	</div>
	        </div>
        );
    }
});

export const PopupFooter = React.createClass({
    render() {
        return (
        	<div className="popup-footer">
	            {this.props.children}
        	</div>
        );
    }
});
