import React from 'react';
import './Enemy.css';

const enemy = (props) => {
  const positionStyle = {
		top: props.enemyPosition.top + 'px',
		left: props.enemyPosition.left + 'px',
	};
  

	return (
    <div className="Enemy" style={positionStyle}></div>
  );
};

export default enemy;
