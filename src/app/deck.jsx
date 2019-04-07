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
    currentCardVisible: false,
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
        if (this.state.currentCardVisible) {
            this.setState(state => ({
                currentCardVisible: false,
                discardPile: state.discardPile.concat(state.currentCard)
            }));
        } else if (this.state.drawPile.length > 0) {
            this.setState(state => ({
                currentCard: state.drawPile.pop(),
                drawPile: state.drawPile,
                currentCardVisible: true
            }));
        }
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
        let cardInnerClassName = 'card-inner';
        cardInnerClassName += this.state.currentCardVisible ? ' flipped' : '';
        let cardFrontClassName = 'card-front ';
        cardFrontClassName += this.state.currentCard ? this.state.currentCard : 'empty';
        let message;
        if (this.state.drawPile.length === 0) {
            message = "Draw pile is empty"
        } else if (this.state.currentCard === null) {
            message = "Click to draw a card"
        }
        return (
            <div className="deck-container">
                <div className="deck">
                    <div className="card-container" onClick={this.handleClick}>
                        <div className={cardInnerClassName}>
                            <div className="card-back">
                                <p className="message">{message}</p>
                            </div>
                            <div className={cardFrontClassName}>
                                <div className="square"></div>
                                <div className="square"></div>
                            </div>
                        </div>
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