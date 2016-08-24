import React from 'react';

export const SquareButton = React.createClass({
    render() {
        return (
        	<div className="square-button">
	            {this.props.title}
        	</div>
        );
    }
});
