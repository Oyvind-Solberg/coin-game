import React from 'react';
import './Tile.css';
import Coin from './Coin/Coin';

const tile = (props) => {
	const content = props.hasCoin ? <Coin /> : null;
  let classes;

	switch (props.terrain) {
		case 'wall':
      classes = 'Tile wall';
			break;
		case 'dirt':
			classes = 'Tile dirt';
			break;
		case 'grass':
			classes = 'Tile grass';
			break;
		default:
			classes = 'Tile';
			break;
	}
	return <div className={classes}>{content}</div>;
};

export default tile;
