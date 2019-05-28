const checkColMatch = (player, col, y) => {
	let count = 0;

	for(let i = y - 1; i >= 0; i--) {
		col[i] === player ? count++ : count = 0;

		if (count === 3) return true;
	}

	return false;
}

const checkRowMatch = (player, board, y) => {
	let count = 0;

	for(let i = 0; i < board.length; i++) {
		const currPos = board[i][y];

		currPos === player ? count++ : count = 0;
		if (count === 4) {
			console.log(`row win`);
			return true;
		}
	}

	return false;
}

const checkDiagMatch = (start, board, player, x, y) => {

	let count = 0;
	let forwardX, forwardY, backwardX, backwardY;
	// forward diagonal
	if (x === 0 || y === 0) {
		forwardX = x;
		forwardY = y;
	} else if (x <= y) {
		forwardX = 0;
		forwardY = y - x;
	} else {
		forwardX = x - y;
		forwardY = 0;
	}
	
	for(let i = forwardX; i < board.length; i++) {
		board[i][forwardY] === player ? count++ : count = 0;
		forwardY++;
		if (count === 4) return true;
	}
	debugger;
	count = 0;
	// backward diagonal
	if (x === 6 || y === 0) {
		backwardX = x;
		backwardY = y;
	} else if (6 - x > y) {
		backwardX = x + y;
		backwardY = 0;
	} else {
		backwardX = 6;
		backwardY = y - (6 - x);
	}

	for (let i = backwardX; i >= 0; i--) {
		board[i][backwardY] === player ? count++ : count = 0;
		backwardY++;
		if (count === 4) return true;
	}

	return false;
}

const boardIsFull = board => {
	for(let i = 0; i < board.length; i++) {
		const currCol = board[i];

		if (currCol.length !== 6) return false;
	}

	return true;
}

export const calculateWinner = (board, currPlayer, x, y) => {
	const bottomPos = y === 0 ? null : board[x][y - 1];
	const leftPos = x === 0 ? null : board[x - 1][y];
	const rightPos = x === 6 ? null : board[x + 1][y];
	
	const col = board[x];
	const firstCol = x - 3 > 0 ? x - 3 : 0;

	if (col.length > 3 && bottomPos === currPlayer) {
		if (checkColMatch(currPlayer, col, y)) return currPlayer;
	}
	if (leftPos === currPlayer || rightPos === currPlayer) {
		if (checkRowMatch(currPlayer, board, y)) return currPlayer;
	}
	if (checkDiagMatch(firstCol, board, currPlayer, x, y)) return currPlayer;
	if (boardIsFull(board)) return 'Tie';

	return '';
}