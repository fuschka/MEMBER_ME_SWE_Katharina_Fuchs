/**
 * Smapp class gives you a HighScore object.
 * You can read the highscore, update it.
 * 
 * MISSING: read the old highscore from a file instead of initializing it as 0!
 */

class HighScore {
    /**
     * Should read the currentHighScore from file
     */
    constructor(highscoreTagName) {
        this.highscoreTagName = highscoreTagName;
        this.currentHighScore = localStorage.getItem("Highscore");
    }

    /**
     * Compares currentHighScore to the score achieved in the most recentl lost game
     * and decides which one is higher. The higher Value will be the new currentHighScore
     * @param {number} gameScore The score achieved in the most recently lost game
     */
    updateHighScore(gameScore) {
        if (gameScore > this.currentHighScore) {
            this.currentHighScore = gameScore;
            localStorage.setItem("Highscore", String(this.currentHighScore));
        }
    }

    displayHighScore() {
        if (localStorage.length == 0) {
            $("#" + String(this.highscoreTagName)).html(String(0));
        }
        else {
            $("#" + String(this.highscoreTagName)).html(localStorage.getItem("Highscore"));
        }
    }
}