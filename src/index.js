import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Counter from './Counter';
import Excel from './Excel';

var TextAreaCounter = React.createClass({
	getDefaultProps: function() {
		return {
			text: 'foo'
		};
	},

	getInitialState: function() {
		return {
			text: this.props.text
		}
	},

	_handleChange: function(e) {
		this.setState({
			text: e.target.value
		})
	},

	render: function() {
		
		return (
			<div>
				<textarea defaultValue={this.props.text} onChange={this._handleChange}></textarea>
				<h3>{this.state.text} has {this.state.text.length} characters</h3>
				<Counter text={this.state.text} length={this.state.text.length}/>
				<Excel />
			</div>
		);
	}

});

ReactDOM.render(
  <TextAreaCounter />,
  document.getElementById('root')
);
