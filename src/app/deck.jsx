import React from 'react';

import './deck.css';

let drawPile = new Array(60);
drawPile.fill("red", 0, 8)
    .fill("red double", 8, 10)
    .fill("orange", 10, 18)
    .fill("orange double", 18, 20)
    .fill("yellow", 20, 28)
    .fill("yellow double", 28, 30)
    .fill("green", 30, 38)
    .fill("green double", 38, 40)
    .fill("blue", 40, 48)
    .fill("blue double", 48, 50)
    .fill("purple", 50, 58)
    .fill("purple double", 58, 60);

const INITIAL_STATE = {
    currentCard: null,
    drawPile,
    discardPile: []
}

const clone = x => JSON.parse(JSON.stringify(x));

export default class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = clone(INITIAL_STATE);
        this.handleClick = this.handleClick.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.reset = this.reset.bind(this);
    }

    handleClick() {
        if (this.state.currentCard) {
            this.setState(state => ({
                discardPile: state.discardPile.concat(state.currentCard)
            }));
        }
        this.setState(state => ({
            currentCard: state.drawPile.pop(),
            drawPile: state.drawPile
        }));
    }

    shuffle() {
        let drawPile = this.state.drawPile.slice();
        for (let i = drawPile.length - 1; i > 0; --i) {
            let j = Math.floor(Math.random() * (i + 1));
            let x = drawPile[i];
            drawPile[i] = drawPile[j];
            drawPile[j] = x;
        }
        this.setState({ drawPile });
    }

    reset() {
        this.setState({ ...clone(INITIAL_STATE) });
    }

    render() {
        let cardClassName = 'current-card ';
        cardClassName += this.state.currentCard ? this.state.currentCard : 'empty';
        let message;
        if (!this.state.currentCard) {
            if (this.state.drawPile.length === 0) {
                message = "Draw pile is empty"
            } else {
                message = "Click to draw a card"
            }
        }
        return (
            <div className="deck-container">
                <div className="deck">
                    <div className={cardClassName} onClick={this.handleClick}>
                        <span className="message">{message}</span>
                        <div className="square"></div>
                        <div className="square"></div>
                    </div>
                    <div className="controls">
                        <button onClick={this.shuffle}>Shuffle</button>
                        <button onClick={this.reset}>Reset</button>
                    </div>
                </div>
            </div>
        );
    }
}