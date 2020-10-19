import React, { Component } from 'react';
import './App.css';
import GameView from '../components/GameView/GameView';
import StatsView from '../components/StatsView/StatsView';

class App extends Component {
	constructor(props) {
		super(props);
		const [worldMap, coinsLeft] = this.generateWorldMap();
		this.speed = 1000;
		this.state = {
			worldMap: worldMap,
			positions: {
				playerPosition: { top: 250, left: 0 },
				enemyPosition: { top: 250, left: 750 },
			},
			victory: false,
			defeat: false,
			gameStarted: false,
			coinsLeft,
			score: 0,
		};
	}

	generateWorldMap = () => {
		const world = [];
		let coinsLeft = 0;

		for (let i = 0; i < 192; i++) {
			let randNum = Math.floor(Math.random() * 10 + 1);
			let terrain;
			let hasCoin = false;

			const top = Math.floor(i / 16) * 50;
			const left = (i % 16) * 50;

			if (randNum <= 2) {
				terrain = 'wall';
			} else if (randNum <= 6) {
				terrain = 'dirt';
			} else {
				terrain = 'grass';
			}

			if (top === 0 || left === 0 || top === 550 || left === 750) {
				terrain = 'grass';
			}

			if (terrain !== 'wall') {
				hasCoin = true;
			}

			if (
				(top > 100 && left === 0 && top < 400 && left === 0) ||
				(top > 100 && left === 750 && top < 400 && left === 750)
			) {
				terrain = 'grass';
				hasCoin = false;
			}

			if (hasCoin) {
				coinsLeft += 1;
			}

			world.push({
				terrain,
				id: i,
				hasCoin: hasCoin,
				position: {
					top,
					left,
				},
			});
		}

		return [world, coinsLeft];
	};

	handleMove = (event) => {
		if (this.state.victory || this.state.defeat || !this.state.gameStarted)
			return;

		const key = event.key;
		let newTop = this.state.positions.playerPosition.top;
		let newLeft = this.state.positions.playerPosition.left;
		let coinsLeft = this.state.coinsLeft;
		let score = this.state.score;

		switch (key) {
			case 'ArrowLeft':
				newLeft -= 50;
				break;
			case 'ArrowRight':
				newLeft += 50;
				break;
			case 'ArrowUp':
				newTop -= 50;
				break;
			case 'ArrowDown':
				newTop += 50;
				break;
			default:
				return;
		}

		if (!this.checkPassable(newTop, newLeft)) return;

		let tile = this.findTile(newTop, newLeft);

		if (tile.hasCoin) {
			tile.hasCoin = false;
			coinsLeft -= 1;
			score += 100;
		}

		this.setState({
			positions: {
				playerPosition: {
					top: newTop,
					left: newLeft,
				},
				enemyPosition: this.state.positions.enemyPosition,
			},
			coinsLeft,
			score,
		});
	};

	enemyMove = () => {
		const top = this.state.positions.enemyPosition.top;
		const left = this.state.positions.enemyPosition.left;
		const topDiff = this.state.positions.playerPosition.top - top;
		const leftDiff = this.state.positions.playerPosition.left - left;

		let newTop;
		let newLeft;
		const choices = [];

		if (topDiff === 0) {
			newTop = top;
		} else if (topDiff > 0) {
			newTop = top + 50;
		} else {
			newTop = top - 50;
		}

		if (leftDiff === 0) {
			newLeft = left;
		} else if (leftDiff > 0) {
			newLeft = left + 50;
		} else {
			newLeft = left - 50;
		}

		if (this.checkPassable(top, newLeft) && newLeft !== left) {
			choices.push({ top, left: newLeft });
		}

		if (this.checkPassable(newTop, left) && newTop !== top) {
			choices.push({ top: newTop, left });
		}

		if (choices.length === 1) {
			const newPosition = choices[0];

			this.setState({
				positions: {
					playerPosition: this.state.positions.playerPosition,
					enemyPosition: newPosition,
				},
			});
		} else if (choices.length === 2) {
			let randNum = Math.floor(Math.random() * 2 + 1);
			const newPosition = randNum === 1 ? choices[0] : choices[1];

			this.setState({
				positions: {
					playerPosition: this.state.positions.playerPosition,
					enemyPosition: newPosition,
				},
			});
		}
	};

	checkPassable = (top, left) => {
		if (top < 0 || top > 550 || left < 0 || left > 750) {
			return false;
		}

		const { terrain } = this.findTile(top, left);

		if (terrain === 'wall') {
			return false;
		}

		return true;
	};

	findTile = (top, left) => {
		return this.state.worldMap.find((tile) => {
			return tile.position.top === top && tile.position.left === left;
		});
	};

	newGame = () => {
		this.speed = 1000;
		const [worldMap, coinsLeft] = this.generateWorldMap();

		this.setState({
			worldMap: worldMap,
			positions: {
				playerPosition: { top: 250, left: 0 },
				enemyPosition: { top: 250, left: 750 },
			},
			victory: false,
			defeat: false,
			gameStarted: false,
			coinsLeft,
			score: 0,
		});

		clearTimeout(this.tick);
	};

	startGame = () => {
		const tick = () => {
			clearTimeout(this.tick);

			this.tick = setTimeout(() => {
				this.enemyMove();
				this.speed *= 0.99;
				tick();
			}, this.speed);
		};

		tick();

		this.setState({ gameStarted: true });
	};

	componentDidMount() {
		window.onkeydown = this.handleMove;
	}

	componentDidUpdate() {
		const playerTop = this.state.positions.playerPosition.top;
		const playerLeft = this.state.positions.playerPosition.left;
		const enemyTop = this.state.positions.enemyPosition.top;
		const emenyLeft = this.state.positions.enemyPosition.left;

		if (!this.state.victory && this.state.coinsLeft === 0) {
			this.setState({
				victory: true,
			});

			clearTimeout(this.tick);
		}

		if (
			!this.state.defeat &&
			playerTop === enemyTop &&
			playerLeft === emenyLeft
		) {
			this.setState({
				defeat: true,
			});

			clearTimeout(this.tick);
		}
	}

	render() {
		return (
			<div className="App">
				<StatsView
					newGame={this.newGame}
					startGame={this.startGame}
					score={this.state.score}
				/>
				<GameView
					worldMap={this.state.worldMap}
					positions={this.state.positions}
					victory={this.state.victory}
					defeat={this.state.defeat}
					score={this.state.score}
				/>
			</div>
		);
	}
}

export default App;
