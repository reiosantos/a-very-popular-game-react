import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


class Home extends React.Component<any> {
	gridRows = 6;
	gridCols = 6;
	grid: any[] = [];
	colors: any = {}
	rows: number[] = []
	cols: number[] = []
	colorsArray: string[] = [];
	maxNumColors = 0;

	constructor(props: any) {
		super(props);
		this.rows = this.getArray(this.gridRows);
		this.cols = this.getArray(this.gridCols);

		this.maxNumColors = this.rows.length / 2;
		// creating (this.rows.length/2) random colors
		this.getArray(this.maxNumColors).forEach(i => {
			this.colorsArray[i] = this.setRandomColor();
		});
	}

	setRandomColor = (): string => {
		const colorSign = '#';
		const randomNumber = Math.floor(Math.random() * 16777215).toString(16);
		return `${colorSign}${randomNumber}`;
	};

	getArray = (num: number) => Array(num).fill(1).map((i, idx) => idx)

	private shuffleMe = (row: number, col: number) => (event: any) => {
		console.log(row, col);


		this.setState({});
	}

	render() {
		return (
			<table className="table w-auto m-auto">
				<tbody>
				{this.rows.map((i, idx) => {
					this.grid[idx] = [];
					return <tr key={i * idx}>
						{
							this.cols.map((j, idx1) => {
								this.grid[idx][idx1] = j;
								if (this.colors[`${i}${j}`] === undefined){
									this.colors[`${i}${j}`] = Math.floor(Math.random() * this.maxNumColors)
								}

								const background = this.colorsArray[this.colors[`${i}${j}`]];

								return (
									<td
										onClick={this.shuffleMe(i, j)}
										style={{backgroundColor: background}}
										key={j * idx1}>{i} {j}
									</td>
								);
							})
						}
					</tr>;
				})}
				</tbody>
			</table>
		);
	}
}

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={Home}/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
