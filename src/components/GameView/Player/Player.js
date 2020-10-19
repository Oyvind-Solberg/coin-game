import React from 'react';
import './Player.css';

const player = (props) => {
  const positionStyle = {
		top: props.playerPosition.top + 'px',
		left: props.playerPosition.left + 'px',
	};
  

	return (
    <div className="Player" style={positionStyle}></div>
  );
};

export default player;
