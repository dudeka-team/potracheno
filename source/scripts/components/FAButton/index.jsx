import React, {PropTypes} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentAdd from 'material-ui/svg-icons/content/add';


const FAButton = React.createClass({
	render() {
		const icon = this.props.personAdd ? <PersonAdd /> : <ContentAdd />;
		return (
			<FloatingActionButton backgroundColor={this.props.bgcolor}>
				{icon}
			</FloatingActionButton>
		);
	},
});


FAButton.propTypes = {
	bgcolor: PropTypes.string,
	personAdd: PropTypes.bool,
	contentAdd: PropTypes.bool,
};


export default FAButton;
