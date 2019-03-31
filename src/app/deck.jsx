import React from 'react';

import './deck.css';

export default class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCard: null,
            drawPile: ['cat', 'dog', 'fish'],
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
        return (
            <div className="current-card" onClick={this.handleClick}>
                {this.state.currentCard}
            </div>
        );
    }
}