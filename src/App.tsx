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
	state: any = {}

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

	private markMe = (b_row: number, b_col: number) => (event: any) => {
		const origin = [b_row - 1, b_col - 1].filter(v => v > -1);
		if (origin.length !== 2) return;

		const tileHasOrigin = origin.length === 2 && this.colors[origin.join("")] === this.colors[`${b_row}${b_col}`];
		if (!tileHasOrigin) {
			alert('----Has no origin---');
			return;
		}

		const [row, col] = origin;

		const top = [row - 1, col].filter(v => v > -1);
		const right = [row, col + 1].filter(v => v < this.gridCols);
		const bottom = [row + 1, col].filter(v => v < this.gridRows);
		const left = [row, col - 1].filter(v => v > -1);

		this.setState({origin, top, left, bottom, right, selected: `${b_row}${b_col}` });
	}

	private shuffleMe = (colorIdx: number) => (event: any) => {
		const {top, left, bottom, right} = this.state;

		this.colors[top.join("")] =
			this.colors[left.join("")] =
				this.colors[bottom.join("")] =
					this.colors[right.join("")] = colorIdx;

		this.setState({});
	};

	render() {
		return (
			<React.Fragment>
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
											onClick={this.markMe(i, j)}
											className={this.state.selected === `${i}${j}` ? 'selected' : ''}
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

				{ this.colorsArray.map((c, i) => {
					return <button
						key={i}
						className="w-auto m-auto btn btn-small btn"
						style={{backgroundColor: c}}
						onClick={this.shuffleMe(i)}>
						{c}
					</button>;
				})}
			</React.Fragment>
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
