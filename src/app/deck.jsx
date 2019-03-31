import React from 'react';

import './deck.css';

export default class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCard: null,
            drawPile: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
            discardPile: []
        };
        this.handleClick = this.handleClick.bind(this);
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

    render() {
        let className = 'current-card ' + this.state.currentCard;
        return (
            <div className={className} onClick={this.handleClick}>
            </div>
        );
    }
}