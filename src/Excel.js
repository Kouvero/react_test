import React from 'react';
// import ReactDOM from 'react-dom';
import './Excel.css';

	
var headers = [
    "Book", "Author", "Language", "Published", "Sales"
];

var data = [
    ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954–1955", "150 million"], 
    ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"], 
    ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million"], 
    ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"], 
    ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754–1791", "100 million"], 
    ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"], 
    ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"],
];

var Excel = React.createClass({

	getInitialState: function() {
		return {
			data: data,
			sortby: null,
			descending: false,
			edit: null // {row: index, cell: index}
		};
	},

	createTitles: function(headers) {
		var state = this.state;
		return (
				headers.map(function(header, idx) {
				if(state.sortby === idx) {
					header += state.descending ? ' \u2191' : ' \u2193'
				}
				return <th key={idx}>{header}</th>
			})
		);
	},

	_save: function() {
		
	},
	
	renderTable: function(data) {
		var component = this;
		var edit = this.state.edit;
		return (
			data.map(function(row, rowid) {
				return (
					<tr key={rowid}> 
						{
							row.map(function(cell, id) {
								// console.log(edit);	// checking state scope								
								if (edit && edit.row === rowid && edit.cell === id) {
									return (
										<form>
											<input type="text" defaultValue={cell}></input>
										</form>
										);
								}
								return <td key={id} data-row={rowid}> {cell} </td> 
							})
						}
					</tr>
				);
			}		
			)
		);
	},

	_sort: function(e) {
		var column = e.target.cellIndex;
		var data = this.state.data.slice();
		var descending = this.state.sortby === column && !this.state.descending;
		
		console.log('Sorting...');
		data.sort(function(a,b) {
			return descending
				? (a[column] < b[column] ? 1 : -1)
				: (a[column] > b[column] ? 1 : -1);
		});
		console.log(data);
		this.setState({
			data: data,
			sortby: column,
			descending: descending
		});

	},	
			
	_showEditor: function(e) {
		this.setState({edit: {
			row: parseInt(e.target.dataset.row, 10),
			cell: e.target.cellIndex
		}});
	},

	render: function() {
		return (
			<table>
				<thead onClick={this._sort}>
					<tr>
						{this.createTitles(headers)}
					</tr>
				</thead>
				<tbody onDoubleClick={this._showEditor}>
						{this.renderTable(this.state.data)}														
				</tbody>
			</table>
		);		
	}		
	
});

module.exports = Excel;
