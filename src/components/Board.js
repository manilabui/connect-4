import React, { Component } from 'react';
import Coin from './Coin';
import { calculateWinner } from '../helpers';

const initState = {
	numOfCols: 7,
	numOfRows: 6,
	board: [
		[],	// col 0
		[], // col 1
		[], // col 2
		[], // col 3
		[], // col 4
		[], // col 5
		[]	// col 6
	],
	turnNum: 0,
	currPlayer: 'Purple',	// or Navy
	winner: '' 				// or Purple or Navy or Tie
}

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numOfCols: 7,
			numOfRows: 6,
			board: [
				[],	// col 0
				[], // col 1
				[], // col 2
				[], // col 3
				[], // col 4
				[], // col 5
				[]	// col 6
			],
			turnNum: 0,
			currPlayer: 'Purple',	// or Navy
			winner: '' 				// or Purple or Navy or Tie
		};
	}

	handleButton() {
		this.setState(initState);
	}

	handleClick(col) {
		let { numOfRows, board, currPlayer, turnNum, winner } = this.state;
		const boardCopy = board.slice();
		const nextPlayer = currPlayer === 'Purple' ? 'Navy' : 'Purple';

		if (!winner) {
			if (boardCopy[col].length < numOfRows) {
				boardCopy[col].push(currPlayer);
				const currRow = boardCopy[col].length - 1;
				// 7 is the least amount of turns it takes to win
				if (turnNum > 5) {
					const winner = calculateWinner(boardCopy, currPlayer, col, currRow);

					if (winner) this.setState({winner: winner});
				}

				this.setState({
					board: boardCopy,
					currPlayer: winner ? currPlayer : nextPlayer,
					turnNum: ++turnNum
				});
			}
		}
		console.log(boardCopy);
	}

	renderCoin(x, y) {
		return (
			<Coin key={y} x={x} y={y} board={this.state.board} onClick={() => this.handleClick(x)}/>
		)
	}

	render() {
		const { currPlayer, winner, numOfCols, numOfRows } = this.state;
		const grid = [];
  		let banner = `${currPlayer} Turn`;

  		if (winner) winner === `Tie` ? banner = `It's A Tie!` : banner = `${winner} Wins!`;

		for(let x = 0; x < numOfCols; x++) {
			const col = [];

			for (let y = numOfRows - 1; y >= 0; y--) {
				col.push(this.renderCoin(x, y));
			}

			grid.push(<div key={x} className='dim'>{col}</div>);
		}

  		return (
    		<div className="center w-90 br3 br--top hidden ba b--black-10 mv4">
				<h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">{banner}</h1>
				<div className="flex flex-nowrap justify-center pa3 bt b--black-10">{grid}</div>
				<button onClick={() => this.handleButton()} className="f7 link dim br-pill ba bw1 b--black-10 ph3 pv2 mb2">Reset</button>
			</div>
  		);
	}
};

export default Board;