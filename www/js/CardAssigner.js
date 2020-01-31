/**
* CardAssigner has methods that define which image should be on which card's back.
* Pairs of cards with the same image on the back can be made randomly and displayed.
*/
class CardAssigner {

    /** 
     * Calls the mapSource method.
     *  
     * @param {number} numberOfCards  Number of cards in the game, must be even
     * @param {String[]} cardBackSourceArray Array holding the relative paths to the card back image sources in strings
     */
    constructor(numberOfCards, cardBackSourceArray) {

        this.numberOfCards = numberOfCards;
        this.cardBackSourceArray = cardBackSourceArray;
        this.sourceMap;
        this.pair = [];

        this.mapSource();
    }

    /**
     * Generates a Number between 1 and numberOfCards, needed to pick a random card-back.
     */
    getRandomCardId = () => {
        let randomNumber = Math.floor((Math.random() * this.numberOfCards) + 1);
        return randomNumber;
    }

    /**
     * Generates a Number between 1 and sourceMap.size, needed to pick a random image source for 
     * card-back.
     */
    getRandomSourceId = () => {
        let currentSourceId = Math.floor((Math.random() * this.sourceMap.size) + 1);
        return currentSourceId;
    }

    /**
     * Maps image source urls to a number.
     */
    mapSource = () => {
        this.sourceMap = new Map();

        for (let i = 1; i <= this.cardBackSourceArray.length; i++) {
            this.sourceMap.set(i, this.cardBackSourceArray[i - 1]);
        }
    }

    /**
     * Creates four pairs of cards that match.
     * Made of two card ids and a source id.
     * The randomly picked values for the cards or the sources cannot be picked twice.
     */
    makePairs = () => {
        let currentCardId = [0];
        let randomCardId = 0;
        let currentSourceId = [0];
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
            this.pair[i] = { cardId1: currentCardId[i], cardId2: currentCardId[this.numberOfCards - 1 - i], srcId: currentSourceId[i] };
        }
    }

    /**
     * Makes the pairs visible in the game.
     * To display your pairs, give the following ids to your card-backs:
     * 'back' plus number.
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
