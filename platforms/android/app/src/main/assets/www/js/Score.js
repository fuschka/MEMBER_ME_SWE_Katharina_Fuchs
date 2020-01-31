/**
 * Smapp class gives you a Score object.
 * You can read the score, update it.
 * 
 * MISSING: read the old score from a file instead of initializing it as 0!
 */

class Score {
    /**
     * Should read the current Score from file
     */
    constructor() {
        this.currentScore = 0;
    }

    updateScore(changeType) {
        switch (changeType) {
            case 0:
                this.currentScore = 0;
                this.displayScore("score");
                break;
            case 1:
                this.currentScore++;
                this.displayScore("score");
                break;
            default: console.log("Error");
        }


    }

    displayScore(tagId) {
        $("#" + String(tagId)).html(String(this.currentScore)).bind(this);
    }
}