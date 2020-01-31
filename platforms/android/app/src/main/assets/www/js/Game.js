/* Main js code*/
class Game {
    /**
     * missing doc!
     */
    constructor(numberOfCards, maxFails, highscoreTagName) {

        this.cardPickCounter = 0;
        this.firstCardPick = 0;
        this.secondCardPick = 0;

        this.successCount = 0;
        this.failCount = 0;

        this.highScore = new HighScore(highscoreTagName);
        this.gameScore = new Score();
        this.myCA = new CardAssigner(numberOfCards);
        this.myAnimation = new Animation();

        this.initClickEvents();
        this.myCA.makePairs();
        this.myCA.displayPairs();
        this.highScore.displayHighScore();

        this.maxSuccess = this.myCA.numberOfCards / 2;
        this.maxFails = maxFails;
        this.gameInitialized = true;
    }

    /**
     * Handle function for click event of the Cards
     * Initialsizes Card-flip-triggers to be manual
     * flips the card on click if less than two cards 
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
     * Has the user already clicked two cards? no, flip it. save card number for later
     * Checks if user has already clicked two cards
     * evaluates the move if two cards have been clicked
     * 
     * @param num Identifier of the Card
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
     * Functions wait 1.5 seconds,
     * then decides whether the move was successful or fail
     */
    evaluateMove = () => {
        let src1 = $("#back" + String(this.firstCardPick)).attr('src');
        let src2 = $("#back" + String(this.secondCardPick)).attr('src');

        if (src1 == src2) {
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
        else {
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
    }

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


