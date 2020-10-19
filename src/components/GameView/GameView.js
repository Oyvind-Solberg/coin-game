import React from 'react';
import './GameView.css';
import Tile from './Tile/Tile';
import Player from './Player/Player';
import Enemy from './Enemy/Enemy';
import Message from './Message/Message';

const gameView = (props) => {
	const worldMap = props.worldMap.map((tile) => {
		return <Tile terrain={tile.terrain} key={tile.id} hasCoin={tile.hasCoin} />;
	});
	return (
		<div className="GameView">
			<Message
				victory={props.victory}
				defeat={props.defeat}
				score={props.score}
			/>
			<Player playerPosition={props.positions.playerPosition} />
			<Enemy enemyPosition={props.positions.enemyPosition} />
			{worldMap}
		</div>
	);
};

export default gameView;
