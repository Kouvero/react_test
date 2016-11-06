import React from 'react';

var Counter = React.createClass({
	propTypes: {
		text: React.PropTypes.string,
		length: React.PropTypes.number
	},

	name: 'Counter',

	shouldComponentUpdate: function(nextProps, nextState) {
		return this.props.text !== nextProps.text;
	},

	render: function() {
		console.log(this.name + ' updates...');
		return (
			<div>
				<h1>Moar bigness with {this.props.text.length} characters in the word {this.props.text +'!'}</h1>
			</div>
		);
	}
});

module.exports = Counter;
