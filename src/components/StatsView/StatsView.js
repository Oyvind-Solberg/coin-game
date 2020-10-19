import React from 'react';
import './StatsView.css';

const statsView = (props) => {
	return (
		<div className="StatsView">
			<div>
				<button onClick={props.newGame}>New game</button>
				<button onClick={props.startGame}>Start game</button>
      </div>
      <p className="score">Score: {props.score}</p>
		</div>
	);
};

export default statsView;
