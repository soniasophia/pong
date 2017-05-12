import { SVG_NS, KEYS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.padding = 10;
		this.radius = 8;
	
		this.gameElement = document.getElementById(element);

		this.board = new Board(this.width, this.height);

		this.paddle1 = new Paddle(this.height, this.paddleWidth, this.paddleHeight, this.padding, (this.height-this.paddleHeight)/2, KEYS.a, KEYS.z
		);

		this.paddle2 = new Paddle(this.height, this.paddleWidth, this.paddleHeight, (this.width-this.paddleWidth-this.padding), (this.height-this.paddleHeight)/2, KEYS.up, KEYS.down);

		this.ball = new Ball(this.radius, this.width, this.height);

		document.addEventListener('keydown', event => {
			if(event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		})
	}

	render() {
		if (this.pause) {
			return;
		}

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);

		this.gameElement.appendChild(svg);

		this.board.render(svg);
		this.paddle1.render(svg);
		this.paddle2.render(svg);
		this.ball.render(svg, this.paddle1, this.paddle2);
	}
}