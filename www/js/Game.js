/**
* Sets up the game using the classes HighScore, Score, Animation and CardAssigner.
* Note that the jquery plugin "jquery.flip" ist used for the card animation. Id for the cards must be: "card" + number,
* for the card backs: "back" + number, for the images on the card backs: number.
* The numbers have to start with 1 and be incremented.
*/
class Game {

    /**
     * Initializes the game and makes it ready to be played. 
     * 
     * @param {number} maxFails Number of maximum of failed moves before game is lost
     * @param {HighScore} highscore HighScore Object for the Game
     * @param {Score} gameScore Score Object for the Game
     * @param {CardAssigner} myCardAssinger CardAssigner for the Game
     * @param {Animation} myAnimation Set of animations for the Game
     */
    constructor(maxFails, highScore, gameScore, myCardAssinger, myAnimation) {

        this.cardPickCounter = 0;
        this.firstCardPick = 0;
        this.secondCardPick = 0;

        this.successCount = 0;
        this.failCount = 0;

        this.highScore = highScore;
        this.gameScore = gameScore;
        this.myCA = myCardAssinger;
        this.myAnimation = myAnimation;

        this.initClickEvents();
        this.myCA.makePairs();
        this.myCA.displayPairs();
        this.highScore.displayHighScore();

        this.maxSuccess = this.myCA.numberOfCards / 2;
        this.maxFails = maxFails;
        this.gameInitialized = true;
    }

    /**
     * Handle function for click event of the Cards.
     * Initialsizes Card-flip-triggers to be manual.
     * Flips the card on click if less than two cards.
     */
    initClickEvents = () => {
        for (let i = 1; i < (this.myCA.numberOfCards + 1); i++) {
            $("#card" + String(i)).flip({
                trigger: 'manual'
            });

            $("#" + String(i)).click((e) => {
                this.cardClickHandler(e.target.id);
            }).bind(this);
        }
    }

    /**
     * Has the user clicked two cards? No, flip it. Save card number for evaluation.
     * Yes, save card number and  evaluate the move.
     * 
     * @param num Identifier of the clicked Card
     */
    cardClickHandler = (num) => {
        if (this.gameInitialized) {
            if ((this.cardPickCounter < 2) && (this.firstCardPick != num)) {
                $("#card" + String(num)).flip(true);
                this.cardPickCounter++;
                if (this.firstCardPick != 0) {
                    this.secondCardPick = num;
                }
                else {
                    this.firstCardPick = num;
                }
                if (this.cardPickCounter == 2) {
                    this.evaluateMove();
                }
            }
        }
    }

    /**
     * Function evaluates a move by checking if it was successful or not
     * and decides what should happen next.
     */
    evaluateMove = () => {
        let src1 = $("#back" + String(this.firstCardPick)).attr('src');
        let src2 = $("#back" + String(this.secondCardPick)).attr('src');

        if (src1 == src2) {
            this.moveSuccessful();
        }
        else {
            this.moveFailed();
        }
    }

    /**
     * Updates the game after a successful move and checks if the game is won. If it is won, the function will call gameWon();
     */
    moveSuccessful = () => {
        this.firstCardPick = 0;
        this.secondCardPick = 0;
        this.cardPickCounter = 0;
        this.successCount++;
        if (this.successCount == this.maxSuccess) {
            setTimeout(() => {
                this.gameWon();
            }, 1000);
        }
    }

    /**
    * Updates the game after a failed move and checks if the game is lost. If it is lost, the function will call gameLost();
    */
    moveFailed = () => {
        setTimeout(() => {
            $("#card" + String(this.firstCardPick)).flip(false).bind(this);
            $("#card" + String(this.secondCardPick)).flip(false).bind(this);

            this.firstCardPick = 0;
            this.secondCardPick = 0;
            this.failCount++;
            this.myAnimation.displayFail(this.failCount);

            setTimeout(() => {
                if (this.failCount == this.maxFails) {
                    this.gameLost();
                }
                else {
                    this.cardPickCounter = 0;
                }
            }, 300);
        }, 900);
    }

    /**
     * Continues the game after winning it.
     */
    gameWon = () => {
        this.gameInitialized = false;

        for (let i = 1; i < (this.myCA.numberOfCards + 1); i++) {
            $("#card" + String(i)).flip(false).bind(this);
        }
        setTimeout(() => {
            this.gameScore.updateScore(1);
            this.gameReset();
        }, 600);
    }

    /**
     * Continues the game after losing it.
     */
    gameLost = () => {
        this.gameInitialized = false;
        this.highScore.updateHighScore(this.gameScore.currentScore);
        this.highScore.displayHighScore();
        this.gameScore.updateScore(0);

        for (let i = 1; i < (this.myCA.numberOfCards + 1); i++) {
            $("#card" + String(i)).flip(false).bind(this);
        }

        this.myAnimation.lostAnimation();

        setTimeout(() => {
            this.gameReset();
        }, 1500);
    }

    /**
     * Default reset contained in gameWon() and gameLost().
     */
    gameReset = () => {
        this.cardPickCounter = 0;
        this.successCount = 0;
        this.failCount = 0;
        this.firstCardPick = 0;
        this.secondCardPick = 0;

        this.myAnimation.displayFailReset();
        this.myCA.makePairs();
        this.myCA.displayPairs();
        this.gameInitialized = true;
    }
}


