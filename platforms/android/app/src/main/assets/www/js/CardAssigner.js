/**
* CardAssigner has methods that define which image should be on which card's back.
* Pairs of cards with the same image on the back can be made randomly and displayed.
*/
class CardAssigner {

    /**
     * Class variables sourceMap, array back 
     * and array pair are defined,
     * Calls the mapSource method
     */
    constructor(numberOfCards) {

        this.numberOfCards = numberOfCards;
        this.sourceMap;
        this.back = [];
        this.pair = [];

        this.mapSource();
    }

    /**
     * Generates a Number between 1 and 8, needed to pick a random card-back 
     */
    getRandomCardId = () => {
        let randomNumber = Math.floor((Math.random() * this.numberOfCards) + 1);
        return randomNumber;
    }

    /**
     * Generates a Number between 1 and 10, needed to pick a random image source for 
     * card-back
     */
    getRandomSourceId = () => {
        let currentSourceId = Math.floor((Math.random() * this.sourceMap.size) + 1);
        return currentSourceId;
    }

    /**
     * Maps image source urls to a number
     */
    mapSource = () => {
        this.sourceMap = new Map();
        this.sourceMap.set(1, "img/cards/01Card.png");
        this.sourceMap.set(2, "img/cards/02Card.png");
        this.sourceMap.set(3, "img/cards/03Card.png");
        this.sourceMap.set(4, "img/cards/04Card.png");
        this.sourceMap.set(5, "img/cards/05Card.png");
        this.sourceMap.set(6, "img/cards/06Card.png");
        this.sourceMap.set(7, "img/cards/07Card.png");
        this.sourceMap.set(8, "img/cards/08Card.png");
        this.sourceMap.set(9, "img/cards/09Card.png");
        this.sourceMap.set(10, "img/cards/10Card.png");
    }

    /**
     * Creates four pairs of cards that match, 
     * made of two card ids and a source id
     * the randomly picked values for the cards or the sources cannot be picked twice
     */
    makePairs = () => {
        let currentCardId = [0, 0, 0, 0, 0, 0, 0, 0];
        let randomCardId = 0;
        let currentSourceId = [0, 0, 0, 0];
        let randomSourceId = 0;

        for (let i = 0; i < this.numberOfCards; i++) {
            randomCardId = this.getRandomCardId();
            if (i == 0) {
                currentCardId[i] = randomCardId;
            }
            else {
                for (let j = 0; j < i; j++) {
                    if (randomCardId == currentCardId[j]) {
                        randomCardId = this.getRandomCardId();
                        j = -1;
                    }
                    else {
                        currentCardId[i] = randomCardId;
                    }
                }
            }
        }

        for (let i = 0; i < (this.numberOfCards / 2); i++) {
            randomSourceId = this.getRandomSourceId();
            if (i == 0) {
                currentSourceId[i] = randomSourceId;
            }
            else {
                for (let j = 0; j < i; j++) {
                    if (randomSourceId == currentSourceId[j]) {
                        randomSourceId = this.getRandomSourceId();
                        j = -1;
                    }
                    else {
                        currentSourceId[i] = randomSourceId;
                    }
                }
            }
            this.pair[i] = { cardId1: currentCardId[i], cardId2: currentCardId[7 - i], srcId: currentSourceId[i] };
        }
    }

    /**
     * Makes the pairs visible in the game
     */
    displayPairs = () => {
        for (let i = 0; i < (this.numberOfCards / 2); i++) {
            let cardId1 = this.pair[i].cardId1;
            let cardId2 = this.pair[i].cardId2;
            let srcId = this.sourceMap.get(this.pair[i].srcId);
            $("#back" + String(cardId1)).attr("src", srcId);
            $("#back" + String(cardId2)).attr("src", srcId);
        }
    }
}
