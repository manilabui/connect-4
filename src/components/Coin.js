import React, { Component } from 'react';
import './Coin.css';
import PropTypes from 'prop-types';

class Coin extends Component {
	render() {
		const { onClick, board, x, y } = this.props;

		const emptySlot = <button className="coin ba bw1 mb2 br-100 b--black-10 h2-m w2-m h3 w3" alt="empty slot" />;
		const purpleSlot = <button className="coin bg-purple ba bw1 mb2 br-100 b--black-10 h2-m w2-m h3 w3" alt="player one coin" />;
		const navySlot = <button className="coin bg-navy ba bw1 mb2 br-100 b--black-10 h2-m w2-m h3 w3" alt="player two coin" />;
		let currSlot = emptySlot;

		if (board[x][y] === 'Purple') currSlot = purpleSlot;
		if (board[x][y] === 'Navy') currSlot = navySlot;

		return (
		    <div onClick={() => onClick(x)} className=" pa1 pv1">
				{currSlot}
			</div>
		)
	}
}

Coin.propTypes = {
	onClick: PropTypes.func.isRequired,
	board: PropTypes.array.isRequired,
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired
}

export default Coin;