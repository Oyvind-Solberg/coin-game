import React from 'react';
import './Message.css';

const message = (props) => {
	let text;

	if (props.victory) {
		text = 'Victory!';
  }
  
	if (props.defeat) {
		text = 'Game over!';
	}

	const display = props.victory || props.defeat ? 'flex' : 'none';
	const displayStyle = {
		display: display,
	};

	return (
		<div className="Message" style={displayStyle}>
      <p>{text}</p>
      <p>Score: {props.score}</p>
		</div>
	);
};

export default message;
