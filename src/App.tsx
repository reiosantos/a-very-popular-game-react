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
		const origin = [row - 1, col - 1].filter(v => v > -1);
		const bottomRight = [row + 1, col + 1].filter(v => v < this.gridCols);
		const bottomLeft = [row + 1, col - 1].filter((v, i) => {
			if (i === 0) {
				return v < this.gridRows;
			}
			return v > -1;
		});
		const topRight = [row - 1, col + 1].filter((v, i) => {
			if (i === 0) {
				return v > -1;
			}
			return v < this.gridCols;
		});

		const top = [row - 1, col].filter(v => v > -1);
		const right = [row, col + 1].filter(v => v < this.gridCols);
		const bottom = [row + 1, col].filter(v => v < this.gridRows);
		const left = [row, col - 1].filter(v => v > -1);

		// TODO: add algorithm



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
